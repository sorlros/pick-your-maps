import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  onImageUpload: (file: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageUpload(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onImageUpload(null);
  };

  return (
    <div className="flex flex-col space-y-2">
      <input
        type="file"
        accept="image/*"
        id="file-input"
        onChange={handleImageChange}
        className="hidden"
      />
      <label 
        htmlFor="file-input" 
        className="bg-transparent text-black border border-neutral-200 rounded-md px-4 py-2 cursor-pointer transition hover:bg-gray-100 active:bg-gray-200 shadow-xs outline-none"
      >
        이미지 선택
      </label>
      {preview && (
        <div className="mt-4 flex flex-col items-center">
          <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded-lg mb-2" />
          <Button variant="destructive" onClick={handleRemoveImage}>이미지 삭제</Button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
