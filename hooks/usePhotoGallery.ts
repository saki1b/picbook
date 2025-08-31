
import { useState, useEffect, useCallback } from 'react';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import type { Photo } from '../types';
import { storage } from '../services/firebase';

const REFRESH_INTERVAL = 10000; // 10 seconds

export const usePhotoGallery = (eventId: string) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPhotos = useCallback(async () => {
    if (!eventId || eventId === 'YOUR_EVENT_ID_HERE') {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const folderPath = `events/${eventId}/public`;
      const listRef = ref(storage, folderPath);
      const res = await listAll(listRef);

      const photoPromises = res.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return {
          name: itemRef.name,
          url: url,
        };
      });

      const newPhotos = await Promise.all(photoPromises);
      
      // Sort photos by name, descending (newest first if using timestamps in names)
      newPhotos.sort((a, b) => b.name.localeCompare(a.name));
      
      setPhotos(newPhotos);
    } catch (err: any) {
        if (err.code === 'storage/object-not-found') {
            setError(`The folder for this event (path: "events/${eventId}/public") does not exist in Firebase Storage yet. Please upload a photo.`);
            setPhotos([]);
        } else {
            console.error("Firebase error:", err);
            setError('Failed to fetch photos. Please ensure your Firebase configuration is correct and you have set up the public read rules for Storage.');
        }
    } finally {
      setIsLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    fetchPhotos(); // Initial fetch

    const intervalId = setInterval(() => {
      fetchPhotos();
    }, REFRESH_INTERVAL);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchPhotos]);

  return { photos, isLoading, error };
};
