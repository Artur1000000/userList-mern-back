import User from "../models/User.js";

export const blockUsers = async (req, res, next) => {
  await User.updateMany({ _id: req.body.ids }, { status: false });
  next();
};

export const unblockUsers = async (req, res, next) => {
  await User.updateMany({ _id: req.body.ids }, { status: true });
  next();
};

export const deleteUsers = async (req, res, next) => {
  await User.deleteMany({ _id: req.body.ids });
  next();
};
