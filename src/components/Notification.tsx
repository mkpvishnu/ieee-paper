import React, { useEffect } from 'react';
import { XCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationProps {
  id: string; // Or number, for key purposes
  message: string;
  type: NotificationType;
  onClose: (id: string) => void;
  duration?: number;
}

const icons: Record<NotificationType, React.ElementType> = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
};

const colorSchemes: Record<NotificationType, { bg: string; text: string; icon: string }> = {
  success: { bg: 'bg-green-500', text: 'text-white', icon: 'text-green-100' },
  error: { bg: 'bg-red-500', text: 'text-white', icon: 'text-red-100' },
  info: { bg: 'bg-blue-500', text: 'text-white', icon: 'text-blue-100' },
  warning: { bg: 'bg-yellow-500', text: 'text-white', icon: 'text-yellow-100' },
};

const Notification: React.FC<NotificationProps> = ({ id, message, type, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const IconComponent = icons[type];
  const colorScheme = colorSchemes[type];

  return (
    <div 
      className={`p-4 rounded-md shadow-lg flex items-start space-x-3 ${colorScheme.bg} ${colorScheme.text} animate-fadeInRight`}
      role="alert"
    >
      <div className={`flex-shrink-0 ${colorScheme.icon}`}>
        <IconComponent size={20} />
      </div>
      <div className="flex-1 text-sm">
        {message}
      </div>
      <button 
        onClick={() => onClose(id)}
        className={`ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${colorScheme.bg} ${colorScheme.text} hover:bg-opacity-80 transition-colors`}
        aria-label="Dismiss"
      >
        <XCircle size={18} />
      </button>
    </div>
  );
};

export default Notification; 