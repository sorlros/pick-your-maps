import React from 'react'
import { Button } from '../ui/button'
import { useAuthStore } from '@/store/useAuthStore'

const LoginButton = () => {
  const setOpen = useAuthStore((state) => state.onOpen);
  const handleOpen = () => {
    setOpen();
  }

  return (
    <Button onClick={handleOpen}>로그인</Button>
  )
}

export default LoginButton