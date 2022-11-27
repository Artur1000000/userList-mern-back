import User from "../models/User.js";

export const getUsers = async (req, res) => {
  const users = await User.find();
  if (users.length > 0) {
    const data = users.map((item) => {
      return {
        id: item._id,
        userName: item.userName,
        email: item.email,
        localRegDate: item.localRegDate,
        localLoginDate: item.localLoginDate,
        status: item.status,
      };
    });
    res.status(200).json(data);
  } else {
    res.status(200).json({ userList: [] });
  }
};

