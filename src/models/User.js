import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    passwordHash: {
      type: String,
      require: true,
    },
    localRegDate: {
      type: Number,
      require: true,
    },
    localLoginDate: {
      type: Number,
      require: true,
    },
    status: {
      type: Boolean,
      require: true,
    },
  },
);
export default mongoose.model("User", UserSchema);
