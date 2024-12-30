import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
  };

  const colors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
  };

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-lg border ${colors[type]} shadow-lg max-w-md animate-slide-up`}>
      <div className="flex items-center gap-3">
        {icons[type]}
        <p className="text-gray-700 font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-auto p-1 hover:bg-gray-200 rounded-full transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </div>
  );
}

// Toast manager
class ToastManager {
  private container: HTMLDivElement;
  private root: ReturnType<typeof createRoot>;

  constructor() {
    this.container = document.createElement('div');
    document.body.appendChild(this.container);
    this.root = createRoot(this.container);
  }

  show(message: string, type: 'success' | 'error') {
    const handleClose = () => {
      this.root.render(null);
    };

    this.root.render(
      <Toast
        message={message}
        type={type}
        onClose={handleClose}
      />
    );
  }

  success(message: string) {
    this.show(message, 'success');
  }

  error(message: string) {
    this.show(message, 'error');
  }
}

export const toast = new ToastManager();