import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();
const SECRET = process.env.secret;

export const reg = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(404).json({ message: "failed to register" });
    }

    const { userName, email, password, localRegDate, localLoginDate } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new User({
      userName: userName,
      email: email,
      passwordHash: hash,
      localRegDate: localRegDate,
      localLoginDate: localLoginDate,
      status: true,
    });

    await doc.save();

    const token = jwt.sign({ _id: doc._id }, SECRET, {
      expiresIn: "30d",
    });

    const { passwordHash, _id, ...dataUser } = doc._doc;

    return res.status(200).json({ token, ...dataUser, id: _id });
  } catch (error) {
    res.status(500).json({ message: "failed to register" });
  }
};
