
import React from 'react';
import type { Photo } from '../types';
import { Download } from 'lucide-react';

interface PhotoCardProps {
  photo: Photo;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo }) => {
  return (
    <div className="group relative aspect-square w-full overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl">
      <img
        src={photo.url}
        alt={photo.name}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-40"></div>
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
        <p className="truncate text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {photo.name}
        </p>
      </div>
      <a
        href={photo.url}
        download={photo.name}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Download ${photo.name}`}
        className="absolute top-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-gray-800 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:bg-white hover:scale-110"
      >
        <Download size={20} />
      </a>
    </div>
  );
};
