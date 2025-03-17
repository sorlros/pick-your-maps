import React from 'react'
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
import { useMemoStore } from '@/store/useMemoStore'

const MemoContainer = () => {
  const onClose = useMemoStore((state) => state.onClose);

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
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">장소명</Label>
              <Input id="name" placeholder="장소명을 써주세요" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="rating">평점</Label>
              <Select>
                <SelectTrigger id="">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
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