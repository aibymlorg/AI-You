import React, { useRef, useState, useEffect } from 'react';
import { Camera, Trash2, Edit2, X, Video, Square } from 'lucide-react';
import { MachineClass } from '../../teachable-machine-types';
import { useLanguage } from '../../contexts/LanguageContext';

interface ClassCardProps {
  cls: MachineClass;
  onUpdate: (updated: MachineClass) => void;
  onRemove: (id: string) => void;
  isActive: boolean;
  stream: MediaStream | null;
}

const ClassCard: React.FC<ClassCardProps> = ({ cls, onUpdate, onRemove, isActive, stream }) => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Photo Recording State
  const [isRecordingFrames, setIsRecordingFrames] = useState(false);
  
  // Video Clip Recording State
  const [isRecordingClip, setIsRecordingClip] = useState(false);
  const [clipProgress, setClipProgress] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(cls.name);

  // Attach shared stream to video element
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  // --- Photo Frame Capture Logic ---
  const captureFrame = () => {
    if (!videoRef.current || !canvasRef.current || !stream) return;
    
    const context = canvasRef.current.getContext('2d');
    if (context) {
      context.drawImage(videoRef.current, 0, 0, 224, 224);
      const dataUrl = canvasRef.current.toDataURL('image/jpeg');
      
      onUpdate({
        ...cls,
        samples: [...cls.samples, {
          id: Date.now().toString(),
          type: 'image',
          dataUrl,
          timestamp: Date.now()
        }]
      });
    }
  };

  const startFrameRecording = () => {
    if (!isActive || isRecordingClip) return;
    setIsRecordingFrames(true);
    captureFrame(); // Immediate capture
  };

  const stopFrameRecording = () => {
    setIsRecordingFrames(false);
  };

  // Continuous frame capture loop
  useEffect(() => {
    let interval: number;
    if (isRecordingFrames) {
      interval = window.setInterval(captureFrame, 100); // 10fps
    }
    return () => clearInterval(interval);
  }, [isRecordingFrames, cls.samples]); 


  // --- Video Clip Recording Logic ---
  const startClipRecording = () => {
    if (!isActive || !stream || isRecordingFrames || isRecordingClip) return;

    setIsRecordingClip(true);
    setClipProgress(0);
    chunksRef.current = [];

    // Initialize MediaRecorder
    try {
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const mimeType = recorder.mimeType || 'video/webm';
        const blob = new Blob(chunksRef.current, { type: mimeType });
        
        // Convert Blob to Base64
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result as string;
          onUpdate({
            ...cls,
            samples: [...cls.samples, {
              id: Date.now().toString(),
              type: 'video',
              dataUrl: base64data,
              timestamp: Date.now()
            }]
          });
        };
        
        chunksRef.current = [];
        setIsRecordingClip(false);
        setClipProgress(0);
      };

      recorder.start(100); // Collect 100ms chunks

      // Start progress timer (record for 2 seconds)
      const duration = 2000;
      const startTime = Date.now();
      
      const progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const p = Math.min((elapsed / duration) * 100, 100);
        setClipProgress(p);

        if (elapsed >= duration) {
          clearInterval(progressInterval);
          if (recorder.state === 'recording') {
            recorder.stop();
          }
        }
      }, 50);

    } catch (err) {
      console.error("Error starting video recording:", err);
      setIsRecordingClip(false);
    }
  };

  const handleDeleteSample = (sampleId: string) => {
    onUpdate({
      ...cls,
      samples: cls.samples.filter(s => s.id !== sampleId)
    });
  };

  const handleNameSave = () => {
    onUpdate({ ...cls, name: tempName });
    setIsEditingName(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[520px]">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        {isEditingName ? (
          <div className="flex items-center gap-2 flex-1">
            <input 
              type="text" 
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="border-b-2 border-[#1a73e8] outline-none text-lg font-medium w-full text-gray-800"
              autoFocus
              onBlur={handleNameSave}
              onKeyDown={(e) => e.key === 'Enter' && handleNameSave()}
            />
          </div>
        ) : (
          <div className="flex items-center gap-2 flex-1">
            <span className="text-lg font-medium text-gray-800 truncate">{cls.name}</span>
            <button onClick={() => setIsEditingName(true)} className="text-gray-400 hover:text-gray-600">
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
        )}
        <button onClick={() => onRemove(cls.id)} className="text-gray-400 hover:text-red-500 ml-2">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-4 gap-4 overflow-y-auto bg-gray-50">
        
        {/* Camera Feed & Visuals */}
        <div className="flex gap-4">
          <div 
            className="w-1/2 aspect-square bg-black rounded-lg overflow-hidden relative shadow-inner cursor-pointer"
            onMouseDown={startFrameRecording}
            onMouseUp={stopFrameRecording}
            onMouseLeave={stopFrameRecording}
            onTouchStart={(e) => { e.preventDefault(); startFrameRecording(); }}
            onTouchEnd={(e) => { e.preventDefault(); stopFrameRecording(); }}
          >
             <video 
               ref={videoRef} 
               autoPlay 
               playsInline 
               muted 
               className={`w-full h-full object-cover transform scale-x-[-1] transition-opacity ${isRecordingClip ? 'opacity-80' : 'opacity-100'}`} 
             />
             <canvas ref={canvasRef} width="224" height="224" className="hidden" />
             
             {/* Visual Overlay for Video Recording */}
             {isRecordingClip && (
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="absolute inset-0 border-[6px] border-red-500 animate-pulse"></div>
                 <div className="bg-red-600/80 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                   {t('teachableMachine.rec')} {Math.round(clipProgress)}%
                 </div>
               </div>
             )}
          </div>
          
          {/* Controls */}
          <div className="w-1/2 flex flex-col gap-2">
             
             {/* Button 1: Hold for Frames */}
             <button
               onMouseDown={startFrameRecording}
               onMouseUp={stopFrameRecording}
               onMouseLeave={stopFrameRecording}
               onTouchStart={(e) => { e.preventDefault(); startFrameRecording(); }}
               onTouchEnd={(e) => { e.preventDefault(); stopFrameRecording(); }}
               className={`flex-1 rounded-lg border-2 border-dashed flex flex-col items-center justify-center transition-colors select-none
                 ${isRecordingFrames
                   ? 'bg-[#e8f0fe] border-[#1a73e8]'
                   : 'border-gray-300 hover:bg-gray-100 hover:border-gray-400'}
                 ${!isActive || isRecordingClip ? 'opacity-50 cursor-not-allowed' : ''}`}
               disabled={!isActive || isRecordingClip}
             >
                <Camera className={`w-5 h-5 mb-1 ${isRecordingFrames ? 'text-[#1a73e8]' : 'text-gray-600'}`} />
                <span className="text-[10px] font-bold text-gray-600 uppercase">{t('teachableMachine.holdToRecord')}</span>
             </button>

             {/* Button 2: Record Clip */}
             <button
               onClick={startClipRecording}
               className={`flex-1 rounded-lg border-2 border-dashed flex flex-col items-center justify-center transition-colors select-none
                 ${isRecordingClip
                   ? 'bg-red-50 border-red-500'
                   : 'border-gray-300 hover:bg-gray-100 hover:border-gray-400'}
                 ${!isActive || isRecordingFrames ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!isActive || isRecordingFrames || isRecordingClip}
             >
                {isRecordingClip ? (
                   <Square className="w-5 h-5 mb-1 text-red-500 fill-red-500" />
                ) : (
                   <Video className="w-5 h-5 mb-1 text-gray-600" />
                )}
                <span className={`text-[10px] font-bold uppercase ${isRecordingClip ? 'text-red-500' : 'text-gray-600'}`}>
                  {isRecordingClip ? t('teachableMachine.recording') : t('teachableMachine.recordClip')}
                </span>
             </button>

          </div>
        </div>

        <div className="text-sm text-gray-500 font-medium">
          {cls.samples.length} {t('teachableMachine.samples')}
        </div>

        {/* Samples Grid */}
        <div className="grid grid-cols-4 gap-2 auto-rows-[minmax(0,_1fr)]">
           {cls.samples.map((sample) => (
             <div key={sample.id} className="relative group aspect-square rounded overflow-hidden shadow-sm bg-gray-100 border border-gray-200">
                {sample.type === 'video' ? (
                   <video
                    src={sample.dataUrl}
                    className="w-full h-full object-cover opacity-80"
                    autoPlay
                    loop
                    muted
                    playsInline
                   />
                ) : (
                   <img src={sample.dataUrl} className="w-full h-full object-cover" alt="sample" />
                )}

                {/* Video Indicator Icon */}
                {sample.type === 'video' && (
                  <div className="absolute bottom-1 right-1">
                    <Video className="w-3 h-3 text-white drop-shadow-md" />
                  </div>
                )}

                <button
                  onClick={() => handleDeleteSample(sample.id)}
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
             </div>
           ))}
           {cls.samples.length === 0 && (
             <div className="col-span-4 py-8 text-center text-gray-400 text-xs italic">
               {t('teachableMachine.addSamplesHint')}
             </div>
           )}
        </div>

      </div>
    </div>
  );
};

export default ClassCard;
