const baseUrl = "http://localhost:3000/api/memos";

export const createMemo = async (memoContent: string) => {
  const response = await fetch(`${baseUrl}/createMemo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: memoContent })
  })

  if (!response.ok) {
    throw new Error("메모 생성 요청 실패");
  }

  return response.json();
}