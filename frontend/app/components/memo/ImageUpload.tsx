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
      onImageUpload(file);  // 부모 컴포넌트로 이미지 파일 전달
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onImageUpload(null);  // 이미지 제거 시 부모 컴포넌트에 null 전달
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <input
        type="file"
        accept="image/*"
        id="image-upload"
        onChange={handleImageChange}
        className="hidden"
      />
      <label htmlFor="image-upload">
        <Button variant="outline">이미지 업로드</Button>
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
