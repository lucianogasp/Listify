import userService from "#services/users.services.js";

const userRegister = async (req, res, next) => {
  const newUser = req.body;
  try {
    const token = await userService.userRegister(newUser);
    return res.status(201).json(token);
  } catch(err) {
    next(err);
  }
}

const userLogin = async (req, res, next) => {
  const newUser = req.body;
  try {
    const token = await userService.userLogin(newUser);
    return res.status(200).json(token);
  } catch(err) {
    next(err);
  }
}

export default {
  userRegister,
  userLogin
}