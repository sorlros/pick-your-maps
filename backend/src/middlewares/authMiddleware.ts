// module.exports = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) return res.status(403).json({ message: "접근 권한 없음" });

//   try {
//     // JWT 검증 로직 (예제)
//     req.user = { id: 1, name: "Test User" };
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "유효하지 않은 토큰" });
//   }
// };
