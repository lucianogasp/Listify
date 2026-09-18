import userService from "#services/users.services.js";

const userRegister = async (req, res) => {
  const newUser = req.body;
  try {
    const token = await userService.userRegister(newUser);
    return res.status(201).json(token);
  } catch(err) {
    return res.status(500).json({message: err.message});
  }
}

const userLogin = async (req, res) => {
  const newUser = req.body;
  try {
    const token = await userService.userLogin(newUser);
    return res.status(201).json(token);
  } catch(err) {
    return res.status(500).json({message: err.message});
  }
}

export default {
  userRegister,
  userLogin
}