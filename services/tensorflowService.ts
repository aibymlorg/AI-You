import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import { MachineClass, ClassSample } from '../teachable-machine-types';

/**
 * TensorFlow.js service for real machine learning training
 * Uses MobileNet for feature extraction and KNN for classification
 */

// Singleton instances
let mobilenetModel: mobilenet.MobileNet | null = null;
let classifier: knnClassifier.KNNClassifier | null = null;
let isLoading = false;
let backendInitialized = false;

/**
 * Initialize TensorFlow.js backend
 */
const initBackend = async (): Promise<void> => {
  if (backendInitialized) return;

  try {
    console.log('🔧 Initializing TensorFlow.js backend...');

    // Wait for TensorFlow.js to be ready (this initializes the backend)
    await tf.ready();

    // Try to set WebGL backend first (GPU-accelerated), fallback to CPU
    const backend = tf.getBackend();
    console.log('✅ TensorFlow.js backend initialized:', backend);

    backendInitialized = true;
  } catch (error) {
    console.error('❌ Error initializing TensorFlow backend:', error);
    throw error;
  }
};

/**
 * Initialize TensorFlow.js models (MobileNet + KNN Classifier)
 */
const initModels = async (): Promise<void> => {
  if (mobilenetModel && classifier) return;
  if (isLoading) {
    // Wait for existing initialization
    while (isLoading) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    return;
  }

  try {
    isLoading = true;

    // Initialize backend first
    await initBackend();

    console.log('📦 Loading MobileNet model...');

    // Load MobileNet model for feature extraction
    mobilenetModel = await mobilenet.load({
      version: 2,
      alpha: 1.0
    });

    // Create KNN classifier
    classifier = knnClassifier.create();

    console.log('✅ TensorFlow models loaded successfully!');
    console.log('✅ MobileNet ready');
    console.log('✅ KNN Classifier ready');
  } catch (error) {
    console.error('❌ Error loading TensorFlow models:', error);
    throw error;
  } finally {
    isLoading = false;
  }
};

/**
 * Convert data URL to HTMLImageElement
 */
const dataUrlToImage = (dataUrl: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = dataUrl;
  });
};

/**
 * "Trains" the model by adding samples to the KNN classifier
 * This performs real transfer learning using MobileNet features
 */
export const trainClassDescription = async (
  className: string,
  samples: ClassSample[]
): Promise<string> => {
  if (samples.length === 0) {
    return "No samples provided";
  }

  try {
    // Initialize models if needed
    await initModels();

    if (!mobilenetModel || !classifier) {
      throw new Error('Models not loaded');
    }

    console.log(`🎓 Training class "${className}" with ${samples.length} samples...`);

    // Process each sample and add to classifier
    for (const sample of samples) {
      try {
        // Convert data URL to image element
        const img = await dataUrlToImage(sample.dataUrl);

        // Extract features using MobileNet
        const activation = mobilenetModel.infer(img, 'conv_preds');

        // Add the feature vector to the classifier for this class
        classifier.addExample(activation as tf.Tensor, className);

        // Clean up tensor to prevent memory leaks
        activation.dispose();
      } catch (error) {
        console.error(`❌ Error processing sample ${sample.id}:`, error);
      }
    }

    // Return a status message (mimicking the old interface)
    const numExamples = classifier.getClassExampleCount()[className] || 0;
    console.log(`✅ Class "${className}" trained with ${numExamples} examples`);
    console.log('📊 Total classes in classifier:', classifier.getNumClasses());
    console.log('📊 Example counts:', classifier.getClassExampleCount());
    return `Trained with ${numExamples} samples using transfer learning`;

  } catch (error) {
    console.error('Training error:', error);
    return `Error training class ${className}`;
  }
};

/**
 * Classifies a new image using the trained KNN classifier
 * This performs real-time inference using the trained model
 */
export const classifyImage = async (
  imageSrc: string,
  classes: MachineClass[]
): Promise<{ classId: string; confidence: number }> => {
  try {
    // Initialize models if needed
    await initModels();

    if (!mobilenetModel || !classifier) {
      throw new Error('Models not loaded');
    }

    // Check if any classes have been trained
    const activeClasses = classes.filter(c => c.samples.length > 0);

    if (activeClasses.length === 0) {
      console.log('⚠️ No active classes with samples');
      return { classId: "unknown", confidence: 0 };
    }

    // Check if classifier has any examples
    const numClasses = classifier.getNumClasses();
    if (numClasses === 0) {
      console.log('⚠️ Classifier has no trained classes');
      return { classId: "unknown", confidence: 0 };
    }

    console.log('🔍 Running inference...');
    console.log('📊 Classifier has', numClasses, 'classes:', Object.keys(classifier.getClassExampleCount()));

    // Convert image to HTMLImageElement
    const img = await dataUrlToImage(imageSrc);

    // Extract features using MobileNet
    const activation = mobilenetModel.infer(img, 'conv_preds');

    // Classify using KNN
    const result = await classifier.predictClass(activation as tf.Tensor);

    // Clean up tensor
    activation.dispose();

    // Find the matching class ID
    const matchedClass = classes.find(c => c.name === result.label);
    const classId = matchedClass ? matchedClass.id : "unknown";

    // Get confidence from the prediction
    // KNN returns confidences for all classes, we want the highest
    const confidence = result.confidences[result.label] || 0;

    console.log(`✅ Classified as "${result.label}" (ID: ${classId}) with confidence ${(confidence * 100).toFixed(1)}%`);
    console.log('📊 All confidences:', result.confidences);

    return {
      classId,
      confidence
    };

  } catch (error) {
    console.error('Classification error:', error);
    return { classId: "unknown", confidence: 0 };
  }
};

/**
 * Reset the classifier (useful for starting over)
 */
export const resetClassifier = (): void => {
  if (classifier) {
    classifier.clearAllClasses();
  }
};

/**
 * Get the number of examples for each class
 */
export const getClassifierInfo = (): Record<string, number> => {
  if (!classifier) return {};
  return classifier.getClassExampleCount();
};

/**
 * Dispose of all TensorFlow resources (cleanup)
 */
export const dispose = (): void => {
  if (classifier) {
    classifier.dispose();
    classifier = null;
  }
  mobilenetModel = null;
};
