import React, { useState, useEffect, useRef } from 'react';
import { MachineClass, TrainingState } from '../../teachable-machine-types';
import ClassCard from './ClassCard';
import { Plus, Loader2, RefreshCw } from 'lucide-react';
import { trainClassDescription, classifyImage } from '../../services/geminiService';

const MachineWorkbench: React.FC = () => {
  const [classes, setClasses] = useState<MachineClass[]>([
    { id: '1', name: 'Class 1', samples: [] },
    { id: '2', name: 'Class 2', samples: [] }
  ]);
  const [trainingState, setTrainingState] = useState<TrainingState>(TrainingState.IDLE);
  const [isInferring, setIsInferring] = useState(false);
  const [prediction, setPrediction] = useState<{classId: string, confidence: number} | null>(null);
  const [globalStream, setGlobalStream] = useState<MediaStream | null>(null);
  
  // Inference specific refs
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize global camera stream
  useEffect(() => {
    let stream: MediaStream | null = null;
    const initCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 224, height: 224, frameRate: { ideal: 30 } },
          audio: false
        });
        setGlobalStream(stream);
      } catch (err) {
        console.error("Failed to get camera:", err);
      }
    };
    
    initCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Handle Preview Video Attachment
  useEffect(() => {
    if (isInferring && previewVideoRef.current && globalStream) {
      previewVideoRef.current.srcObject = globalStream;
    }
  }, [isInferring, globalStream]);

  const addClass = () => {
    const newId = (classes.length + 1).toString();
    setClasses([...classes, { id: newId, name: `Class ${newId}`, samples: [] }]);
  };

  const removeClass = (id: string) => {
    setClasses(classes.filter(c => c.id !== id));
  };

  const updateClass = (updated: MachineClass) => {
    setClasses(classes.map(c => c.id === updated.id ? updated : c));
  };

  const handleTrain = async () => {
    if (classes.some(c => c.samples.length === 0)) {
      alert("Please add at least one sample to each class before training.");
      return;
    }

    setTrainingState(TrainingState.TRAINING);
    
    // Pass full samples array (ClassSample[]) to the service
    const updatedClasses = await Promise.all(classes.map(async (cls) => {
      const description = await trainClassDescription(cls.name, cls.samples);
      return { ...cls, description };
    }));

    setClasses(updatedClasses);
    setTrainingState(TrainingState.READY);
  };

  // Inference Loop
  useEffect(() => {
    let interval: number;

    const runInference = async () => {
      if (!previewVideoRef.current || !previewCanvasRef.current) return;
      if (trainingState !== TrainingState.READY || !isInferring) return;

      const ctx = previewCanvasRef.current.getContext('2d');
      if (ctx) {
        // Draw from the video element which is playing the global stream
        ctx.drawImage(previewVideoRef.current, 0, 0, 224, 224);
        const currentFrame = previewCanvasRef.current.toDataURL('image/jpeg');
        
        const result = await classifyImage(currentFrame, classes);
        setPrediction(result);
      }
    };

    if (isInferring && trainingState === TrainingState.READY) {
      // Run inference loop
      interval = window.setInterval(runInference, 1500);
    }

    return () => clearInterval(interval);
  }, [isInferring, trainingState, classes]);


  return (
    <div className="flex-1 bg-[#e9eef6] p-4 md:p-8 overflow-x-hidden">
       <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
         
         {/* LEFT: Input Classes */}
         <div className="lg:col-span-5 flex flex-col gap-6">
            {classes.map(cls => (
              <ClassCard 
                key={cls.id} 
                cls={cls} 
                onUpdate={updateClass} 
                onRemove={removeClass}
                isActive={!isInferring} // Disable recording buttons when inferring
                stream={globalStream}   // Pass shared stream
              />
            ))}
            <button 
              onClick={addClass}
              className="py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" /> Add a class
            </button>
         </div>

         {/* CENTER: Training Controls */}
         <div className="lg:col-span-2 flex flex-col items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-sm w-full flex flex-col items-center gap-4 text-center">
               <h3 className="font-bold text-gray-700">Training</h3>
               
               {trainingState === TrainingState.IDLE && (
                 <button 
                  onClick={handleTrain}
                  className="bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold py-3 px-8 rounded shadow transition-transform active:scale-95 flex items-center gap-2"
                 >
                   Train Model
                 </button>
               )}

               {trainingState === TrainingState.TRAINING && (
                 <div className="flex flex-col items-center gap-2">
                   <Loader2 className="w-8 h-8 text-[#1a73e8] animate-spin" />
                   <span className="text-sm text-gray-600 font-medium">Analyzing samples...</span>
                   <span className="text-xs text-gray-400">Processing with Gemini</span>
                 </div>
               )}

               {trainingState === TrainingState.READY && (
                 <div className="flex flex-col items-center gap-4 w-full">
                    <div className="text-green-600 font-bold flex items-center gap-2">
                      Model Trained!
                    </div>
                    <button 
                       onClick={() => setTrainingState(TrainingState.IDLE)}
                       className="text-gray-400 hover:text-gray-600 text-xs flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" /> Retrain
                    </button>
                 </div>
               )}

            </div>
         </div>

         {/* RIGHT: Preview */}
         <div className="lg:col-span-5">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[500px] flex flex-col overflow-hidden">
               <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                 <h3 className="text-lg font-medium text-gray-800">Preview</h3>
                 <div className="flex items-center gap-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={isInferring}
                        onChange={() => trainingState === TrainingState.READY && setIsInferring(!isInferring)}
                        disabled={trainingState !== TrainingState.READY}
                      />
                      <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${trainingState === TrainingState.READY ? 'peer-checked:bg-[#1a73e8]' : 'opacity-50 cursor-not-allowed'}`}></div>
                    </label>
                    <span className={`text-sm font-medium ${isInferring ? 'text-[#1a73e8]' : 'text-gray-400'}`}>
                      {isInferring ? 'ON' : 'OFF'}
                    </span>
                 </div>
               </div>
               
               <div className="flex-1 p-6 flex flex-col items-center gap-6">
                  {/* Preview Box */}
                  <div className="w-64 h-64 bg-black rounded-lg overflow-hidden relative shadow-md">
                     {!isInferring ? (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 text-center p-4">
                           {trainingState === TrainingState.READY 
                              ? "Toggle ON to test your model" 
                              : "Train model to enable preview"}
                        </div>
                     ) : (
                        <>
                          <video ref={previewVideoRef} autoPlay playsInline muted className="w-full h-full object-cover transform scale-x-[-1]" />
                          <canvas ref={previewCanvasRef} width="224" height="224" className="hidden" />
                        </>
                     )}
                  </div>

                  {/* Output Bars */}
                  <div className="w-full space-y-3">
                     {classes.map(cls => {
                        const isMatch = prediction?.classId === cls.id;
                        const confidence = isMatch ? (prediction?.confidence || 0) * 100 : 0;
                        
                        return (
                          <div key={cls.id} className="w-full">
                             <div className="flex justify-between text-sm mb-1">
                                <span className={`font-bold ${isMatch ? 'text-gray-900' : 'text-gray-400'}`}>{cls.name}</span>
                                <span className="text-gray-500">{isMatch ? `${Math.round(confidence)}%` : '0%'}</span>
                             </div>
                             <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                                <div 
                                  className={`h-full transition-all duration-300 ease-out ${isMatch ? 'bg-[#1a73e8]' : 'bg-gray-200'}`}
                                  style={{ width: `${isMatch ? confidence : 0}%` }}
                                ></div>
                             </div>
                          </div>
                        );
                     })}
                  </div>
               </div>
            </div>
         </div>

       </div>
    </div>
  );
};

export default MachineWorkbench;
