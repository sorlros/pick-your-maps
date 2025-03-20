interface MemoState {
  userId: number;
  content: string;
  vote: number;
}

const memos: MemoState[] = [];

// export const getAllUsers = async () => {
//   return users;
// };

// export const createUser = async (userData) => {
//   const newUser = { id: users.length + 1, ...userData };
//   users.push(newUser);
//   return newUser;
// };

export const getAllMemos = async () => {
  return memos;
}

export const createMemo = async (memoData: MemoState) => {
  // prisma로 데이터 생성 및 mongoDB에 생성
  const newMemo = 
  return newMemo;
}