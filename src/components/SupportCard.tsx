import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SupportCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  value: string;
  action?: () => void;
  buttonText?: string;
  showButton?: boolean;
}

export default function SupportCard({
  icon: Icon,
  title,
  description,
  value,
  action,
  buttonText,
  showButton = true
}: SupportCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-start gap-4">
        <div className="bg-orange-100 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-orange-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-2">{description}</p>
          <p className="text-base font-medium text-gray-900">{value}</p>
          
          {showButton && buttonText && (
            <button
              onClick={action}
              className="mt-4 w-full px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}