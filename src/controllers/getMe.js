import UserModel from "../models/User.js";

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "user is not found" });
    }
    if (!user.status) {
      return res.status(404).json({ message: "user is blocked" });
    }

    const {_id, passwordHash, ...userData } = user._doc;
    res.status(200).json({id:_id, ...userData, token: req.token });
  } catch (err) {
    return res.status(403).json({ message: "no access" });
  }
};
