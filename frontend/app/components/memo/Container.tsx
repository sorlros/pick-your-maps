import React, { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useMemoStore } from "@/store/useMemoStore"
import HoverRating from "@/components/memo/rating"
import TagInput from "@/components/memo/tagInput"
import ImageUpload from "@/components/memo/ImageUpload"

const MemoContainer = () => {
  const onClose = useMemoStore((state) => state.onClose);

  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [rating, setRating] = useState<number | null>(2);
  const [category, setCategory] = useState<string>("");
  const [isTitleError, setIsTitleError] = useState<boolean>(false);
  const [isCategoryError, setIsCategoryError] = useState<boolean>(false);

  const handleRatingChange = (newValue: number | null) => {
    setRating(newValue);
  };

  const handleImageUpload = (file: File | null) => {
    setImage(file);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
  };

  const handleSave = async () => {
    let hasError = false;

    const title = (document.getElementById("name") as HTMLInputElement).value;
    const memo = (document.getElementById("memo") as HTMLInputElement).value;

    if (!title.trim()) {
      setIsTitleError(true);
      hasError = true;
    } else {
      setIsTitleError(false);
    }

    if (!category.trim()) {
      setIsCategoryError(true);
      hasError = true;
    } else {
      setIsCategoryError(false);
    }

    if (hasError) return;

    const memoData = {
      title,
      category,
      memo,
      rating,
      tags: tags,
      image: image,
    };
    // console.log("memoData", memoData);

    try {
      const formData = new FormData();
      formData.append("title", memoData.title);
      formData.append("category", memoData.category);
      formData.append("memo", memoData.memo);
      formData.append("rating", String(memoData.rating));
      formData.append("tags", JSON.stringify(memoData.tags.length > 0 ? memoData.tags : []));
      if (image) {
        formData.append("image", image);
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_TO_BACKEND}/api/memo/createMemo`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        try {
          const newMemo = await response.json();
          console.log("메모 생성 성공:", newMemo);
          // 성공 후 처리 (예: 알림, 폼 초기화 등)
        } catch (error) {
          console.error("JSON 파싱 오류:", error);
        }
      } else {
        console.error("메모 생성 실패", response.status);
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  const handleClose = () => {
    onClose();
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>MEMO</CardTitle>
        <CardDescription>당신의 장소를 기록하세요.</CardDescription>
      </CardHeader>
      <CardContent> 
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <div className="flex space-x-2">
            <Label htmlFor="name">장소명</Label>
            {isTitleError && (
              <p className="text-red-500 text-sm">장소명을 기입해주세요</p>
            )}
            </div>
            <Input id="name" placeholder="장소명을 써주세요" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <div className="flex space-x-2">
              <Label htmlFor="category">카테고리</Label>
              {isCategoryError && (
              <p className="text-red-500 text-sm">카테고리를 선택해주세요</p>
            )}
            </div>
            <Select onValueChange={handleCategoryChange}>
              <SelectTrigger id="category">
                <SelectValue placeholder="카테고리를 선택하세요" />
              </SelectTrigger>
              <SelectContent position="popper">  
                <SelectItem value="cafe">카페</SelectItem>
                <SelectItem value="restaurant">식당</SelectItem>
                <SelectItem value="park">공원</SelectItem>
                <SelectItem value="store">상점</SelectItem>
                <SelectItem value="tourist">관광지</SelectItem>
                <SelectItem value="etc">기타</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="memo">메모</Label>
            <Input id="memo" placeholder="메모를 남겨주세요" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="rating">평점</Label>
            <div className="w-full h-9 gap-2 rounded-md border bg-transparent px-3 py-1.5 text-sm justify-center items-center">
                <HoverRating value={rating} onRatingChange={handleRatingChange} />
            </div>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label>태그</Label>
            <TagInput tags={tags} setTags={setTags} />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label>이미지 업로드</Label>
            <ImageUpload onImageUpload={handleImageUpload} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleClose}>닫기</Button>
        <Button onClick={handleSave}>저장</Button>
      </CardFooter>
    </Card>
  )
}

export default MemoContainer