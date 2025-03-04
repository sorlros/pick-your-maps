// const userService = require("../services/userService");

// exports.getUsers = async (req, res) => {
//   try {
//     const users = await userService.getAllUsers();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: "서버 오류", error });
//   }
// };

// exports.createUser = async (req, res) => {
//   try {
//     const newUser = await userService.createUser(req.body);
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ message: "유저 생성 실패", error });
//   }
// };
