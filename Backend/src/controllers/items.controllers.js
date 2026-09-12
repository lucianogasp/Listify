import { getItemsByUserIdService } from "#services/items.service.js";

export const getItemsByUserIdController = async (req, res) => {
  const userId = req.userId; // implementar userId em payload durante jwt midd auth
  try {
    const userItems = await getItemsByUserIdService(userId);
    return res.status(200).json({items: userItems});
  } catch(err) {
    return res.status(500).json({message: err.message});
  }
}