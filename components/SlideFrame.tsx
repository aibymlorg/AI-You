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

  // Check if this slide should show a QR code
  const showQRCode = data.id === 2;
  const qrCodeLink = data.source || "https://brain-potential.vercel.app/";

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

      {/* QR Code Overlay - Only for Module 2 */}
      {showQRCode && (
        <a
          href={qrCodeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-8 right-8 bg-white p-4 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300 z-20 group"
          title="Scan to visit Brain Potential"
        >
          <img
            src="/image/qr-code.svg"
            alt="QR Code to Brain Potential"
            className="w-32 h-32 md:w-40 md:h-40"
          />
          <div className="mt-2 text-center text-xs font-semibold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
            Click to Visit
          </div>
        </a>
      )}
    </div>
  );
};

export default SlideFrame;