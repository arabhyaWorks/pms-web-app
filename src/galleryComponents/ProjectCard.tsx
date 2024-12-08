import React from 'react';
import { ImagePlus } from 'lucide-react';

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    agency: string;
    images: string[];
  };
  onUploadClick: () => void;
}

export default function ProjectCard({ project, onUploadClick }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4">
        <h3 className="font-medium text-gray-900 text-sm leading-snug mb-1">
          {project.title}
        </h3>
        <p className="text-sm text-gray-500">{project.agency}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-2 p-4 pt-0">
        {project.images.map((image, index) => (
          <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={image}
              alt={`Project ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* <div className="px-4 py-3 bg-gray-50 flex justify-end">
        <button
          onClick={onUploadClick}
          className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
        >
          <ImagePlus className="w-4 h-4" />
          <span>Upload Images</span>
        </button>
      </div> */}
    </div>
  );
}