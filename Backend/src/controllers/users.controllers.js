import { userRegisterService } from "#services/users.services.js";

export const userRegisterController = async (req, res) => {
  const newUser = req.body;
  try {
    const userRegistered = await userRegisterService(newUser);
    return res.status(201).json({userRegistered});
  } catch(err) {
    return res.status(500).json({message: err.message});
  }
}