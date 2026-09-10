import { 
  userRegisterService,
  userLoginService
 } from "#services/users.services.js";

export const userRegisterController = async (req, res) => {
  const newUser = req.body;
  try {
    const userRegistered = await userRegisterService(newUser);
    return res.status(201).json({userRegistered});
  } catch(err) {
    return res.status(500).json({message: err.message});
  }
}

export const userLoginController = async (req, res) => {
  const newUser = req.body;
  try {
    const loginMessage = await userLoginService(newUser);
    return res.status(201).json(loginMessage);
  } catch(err) {
    return res.status(500).json({message: err.message});
  }
}