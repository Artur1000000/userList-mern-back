import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();
const SECRET = process.env.secret;

export const auth = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "failed to authorization" });
    }
    if (!user._doc.status) {
      return res.status(403).json({ message: "this account is blocked" });
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPassword) {
      return res.status(404).json({ message: "failed to authorization" });
    }

    await User.updateOne(
      { _id: user._id },
      { localLoginDate: req.body.localLoginDate }
    );

    const token = jwt.sign({ _id: user._id }, SECRET, {
      expiresIn: "30d",
    });

    const { passwordHash, _id, localLoginDate, ...dataUser } = user._doc;

    return res.status(200).json({
      token,
      ...dataUser,
      id: _id,
      localLoginDate: req.body.localLoginDate,
    });
  } catch (error) {
    res.status(500).json({ message: "failed to authorization" });
  }
};
