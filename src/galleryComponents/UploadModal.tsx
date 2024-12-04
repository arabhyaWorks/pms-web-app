import React, { useState } from 'react';
import { ImagePlus, X } from 'lucide-react';

interface UploadModalProps {
  project: {
    id: string;
    title: string;
    agency: string;
  } | null;
  onClose: () => void;
  onSubmit: (image: File, description: string) => void;
}

export default function UploadModal({ project, onClose, onSubmit }: UploadModalProps) {
  const [newImage, setNewImage] = useState<File | null>(null);
  const [description, setDescription] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
    }
  };

  const handleSubmit = () => {
    if (newImage) {
      onSubmit(newImage, description);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Update Project Gallery</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>
            <p className="text-sm text-gray-600">
              {project?.title}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </label>
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-orange-500 transition-colors"
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              <input
                id="fileInput"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                Click to upload or drag and drop
              </p>
              {newImage && (
                <p className="mt-2 text-sm text-green-600">
                  Selected: {newImage.name}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter a brief description of the image"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-orange-500 focus:border-orange-500"
              rows={3}
            />
          </div>
        </div>

        <div className="p-4 border-t">
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!newImage || !description}
              className={`px-4 py-2 text-sm font-medium text-white rounded-md transition ${
                newImage && description
                  ? 'bg-orange-500 hover:bg-orange-600'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}