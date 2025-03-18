import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TagInputProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagInput: React.FC<TagInputProps> = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-2 mb-2">
        <Input
          type="text"
          placeholder="태그를 입력하고 Enter를 누르세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={handleAddTag}>추가</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-2">
        {tags.map((tag) => (
          <div
            key={tag}
            className="flex items-center bg-gray-200 text-sm text-gray-700 px-2 py-1 rounded-full"
          >
            {tag}
            <button
              onClick={() => handleRemoveTag(tag)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
