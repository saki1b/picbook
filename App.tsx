
import React, { useState, useMemo } from 'react';
import { usePhotoGallery } from './hooks/usePhotoGallery';
import { PhotoCard } from './components/PhotoCard';
import { SearchBar } from './components/SearchBar';
import { Spinner } from './components/Spinner';

const App: React.FC = () => {
  // --- Configuration ---
  // IMPORTANT: Replace 'YOUR_EVENT_ID_HERE' with the unique ID for your event.
  // This must match the folder name you create in Firebase Storage.
  // Example: 'sarah-and-john-2024'
  const EVENT_ID = 'YOUR_EVENT_ID_HERE';

  const { photos, isLoading, error } = usePhotoGallery(EVENT_ID);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPhotos = useMemo(() => {
    if (!searchTerm) {
      return photos;
    }
    return photos.filter((photo) =>
      photo.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [photos, searchTerm]);

  const renderContent = () => {
    if (EVENT_ID === 'YOUR_EVENT_ID_HERE') {
      return (
        <div className="text-center p-8 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Configuration Needed!</h2>
          <p>Please open the `App.tsx` file and set your `EVENT_ID`.</p>
          <p className="mt-2 text-sm">Check the `README.md` for full instructions.</p>
        </div>
      );
    }

    if (isLoading && photos.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-64">
          <Spinner />
          <p className="mt-4 text-xl text-gray-500">Loading First Photos...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center p-8 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong.</h2>
          <p>{error}</p>
          <p className="mt-2 text-sm">Please check your Firebase configuration and storage rules.</p>
        </div>
      );
    }

    if (photos.length > 0 && filteredPhotos.length === 0) {
      return (
        <div className="text-center py-16">
          <p className="text-xl text-gray-500">No photos found matching "{searchTerm}"</p>
        </div>
      );
    }
    
    if (photos.length === 0 && !isLoading) {
       return (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-gray-700">Gallery is Empty</h2>
          <p className="text-lg text-gray-500 mt-2">Waiting for the first photos to be uploaded!</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
        {filteredPhotos.map((photo) => (
          <PhotoCard key={photo.name} photo={photo} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#fdfaf6] text-[#4a4a4a] p-4 sm:p-6 lg:p-8">
      <div className="max-w-screen-2xl mx-auto">
        <header className="text-center my-8 md:my-12">
          <h1 className="text-4xl md:text-6xl font-extralight text-rose-800 tracking-wider">
            Wedding Photo Gallery
          </h1>
          <p className="text-lg md:text-xl mt-2 text-gray-500">
            Welcome to Our Special Day
          </p>
        </header>
        
        <main>
          <div className="mb-8">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          {renderContent()}
        </main>

        <footer className="text-center mt-12 py-6 border-t border-gray-200">
          <p className="text-gray-500">Thank you for celebrating with us!</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
