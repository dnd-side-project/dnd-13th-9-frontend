import { useState, useEffect } from 'react';

export function useImageLocalStorage(index?: number) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const images = JSON.parse(localStorage.getItem('images') || '[]');
    if (images.length > 0) {
      setPreview(index !== undefined ? images[index] : images[0]);
    }
  }, [index]);

  const handleFileChange = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreview(url);

    const reader = new FileReader();
    reader.onload = function (event) {
      const result = event.target?.result;
      if (typeof result === 'string') {
        const images = JSON.parse(localStorage.getItem('images') || '[]');
        images.push(result);
        localStorage.setItem('images', JSON.stringify(images));
      }
    };
    reader.readAsDataURL(file);
  };

  return { preview, handleFileChange };
}
