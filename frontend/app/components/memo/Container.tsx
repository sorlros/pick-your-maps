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

  const handleImageUpload = (file: File | null) => {
    setImage(file);
  };

  const handleSave = () => {
    // 이미지와 태그를 저장하거나 전송하는 로직 작성
    console.log("저장된 이미지 파일: ", image);
    console.log("저장된 태그 목록: ", tags);
  };

  const handleClose = () => {
    onClose();
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();  // 폼 제출 방지
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>MEMO</CardTitle>
        <CardDescription>당신의 장소를 기록하세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleFormSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">장소명</Label>
              <Input id="name" placeholder="장소명을 써주세요" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="category">카테고리</Label>
              <Select>
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
              <Label htmlFor="rating">평점</Label>
              <div className="w-full h-9 gap-2 rounded-md border bg-transparent px-3 py-1.5 text-sm justify-center items-center">
                  <HoverRating />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>태그</Label>
              <TagInput tags={tags} setTags={setTags} />  {/* 태그 컴포넌트 추가 */}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>이미지 업로드</Label>
              <ImageUpload onImageUpload={handleImageUpload} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleClose}>닫기</Button>
        <Button>저장</Button>
      </CardFooter>
    </Card>
  )
}

export default MemoContainer