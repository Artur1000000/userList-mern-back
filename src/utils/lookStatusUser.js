import User from "../models/User.js";

export const lookStatusUser = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "user is not found" });
  }
  if (!user.status) {
    return res.status(404).json({ message: "user is blocked" });
  }
  next();
};
