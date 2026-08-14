import React, { useEffect, useState } from 'react';
import { RotateCcw } from 'lucide-react';

interface Props {
  onReset: () => void;
}

export const OrganizerControls: React.FC<Props> = ({ onReset }) => {
  const [tapCount, setTapCount] = useState<number>(0);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Shift + R shortcut
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'r') {
        e.preventDefault();
        triggerReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerReset = () => {
    onReset();
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handleSecretCornerTap = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);
    if (newCount >= 3) {
      setTapCount(0);
      triggerReset();
    }
  };

  return (
    <>
      {/* Invisible Secret 3-Tap Target in Top-Left Corner */}
      <div
        onClick={handleSecretCornerTap}
        onTouchStart={handleSecretCornerTap}
        className="fixed top-0 left-0 w-16 h-16 z-50 cursor-default opacity-0"
        title="Organizer Secret Reset (Tap 3 times)"
      />

      {/* Secret Reset Notification Toast */}
      {showNotification && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-2 px-5 py-2.5 rounded-full bg-slate-900 border border-gold-500/50 text-gold-400 text-xs font-mono tracking-widest uppercase shadow-2xl animate-fade-in">
          <RotateCcw className="w-4 h-4 animate-spin" />
          <span>INAUGURATION STATE RESET TO DASHBOARD</span>
        </div>
      )}
    </>
  );
};
