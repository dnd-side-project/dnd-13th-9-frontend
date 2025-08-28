import { useState, useEffect } from 'react';

export function useImageLocalStorage(key?: string | number, index?: number) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (typeof key === 'string') {
      const images = JSON.parse(localStorage.getItem(key) || '[]');
      if (images.length > 0 && index !== undefined) {
        setPreview(images[index] || null);
      } else if (images.length > 0) {
        setPreview(images[0]);
      }
    } else if (typeof key === 'number') {
      const images = JSON.parse(localStorage.getItem('images') || '[]');
      if (images.length > 0) {
        setPreview(key !== undefined ? images[key] : images[0]);
      }
    }
  }, [key, index]);

  const handleFileChange = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreview(url);

    const reader = new FileReader();
    reader.onload = function (event) {
      const result = event.target?.result;
      if (typeof result === 'string') {
        if (typeof key === 'string') {
          const images = JSON.parse(localStorage.getItem(key) || '[]');
          if (index !== undefined && index < images.length) {
            images[index] = result;
          } else {
            images.push(result);
          }
          localStorage.setItem(key, JSON.stringify(images));
        } else if (typeof key === 'number') {
          const images = JSON.parse(localStorage.getItem('images') || '[]');
          images.push(result);
          localStorage.setItem('images', JSON.stringify(images));
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const clearPreview = () => {
    setPreview(null);
  };

  return { preview, handleFileChange, clearPreview };
}
