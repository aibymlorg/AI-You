import React from 'react';
import { SlideData } from '../types';
import { Lock } from 'lucide-react';

interface SlideFrameProps {
  data: SlideData;
}

const SlideFrame: React.FC<SlideFrameProps> = ({ data }) => {
  // Define standard permissions required for most modern web apps in iframes
  const defaultPermissions = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  
  // If specific permissions are requested (e.g., camera), append them to defaults rather than replacing
  // to ensure base functionality (like autoplay) remains intact.
  const allowAttribute = data.permissions 
    ? `${defaultPermissions}; ${data.permissions}` 
    : defaultPermissions;

  return (
    <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Browser Chrome (Optional Visual Container) */}
      {data.showBrowserChrome && (
        <div className="w-full h-12 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-4 flex-shrink-0 z-10">
          {/* Window Controls */}
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
          </div>

          {/* Address Bar */}
          <div className="flex-1 bg-slate-950 rounded-md h-8 px-3 flex items-center gap-2 text-xs text-slate-400 font-mono border border-slate-800/50">
             <Lock size={12} className="text-green-500" />
             <span className="truncate opacity-70">{data.source}</span>
          </div>

          {/* Spacer to balance traffic lights */}
          <div className="w-14" /> 
        </div>
      )}

      {/* Main Iframe */}
      <iframe
        title={data.title}
        src={data.source}
        srcDoc={data.srcDoc}
        className="w-full flex-1 border-none bg-white" // flex-1 ensures it fills remaining height
        allow={allowAttribute}
        referrerPolicy="no-referrer"
        loading="lazy"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      />
    </div>
  );
};

export default SlideFrame;