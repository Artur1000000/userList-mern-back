import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET = process.env.secret;

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET);
      req.userId = decoded._id;
      req.token = token;
      next();
    } catch (err) {
      return res.status(404).json({ message: "no access" });
    }
  } else {
    return res.status(403).json({ message: "no access" });
  }
};
