import userService from "#services/users.services.js";

export const userRegister = async (req, res) => {
  const newUser = req.body;
  try {
    const userRegistered = await userService.userRegister(newUser);
    return res.status(201).json(userRegistered);
  } catch(err) {
    return res.status(500).json({message: err.message});
  }
}

export const userLogin = async (req, res) => {
  const newUser = req.body;
  try {
    const loginMessage = await userService.userLogin(newUser);
    return res.status(201).json(loginMessage);
  } catch(err) {
    return res.status(500).json({message: err.message});
  }
}

export default {
  userRegister,
  userLogin
}