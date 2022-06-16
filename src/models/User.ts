import mongoose from "mongoose";
import { IUser } from "../../types";

const userSchema = new mongoose.Schema<IUser>({
  userid: { unique: true, type: "string", required: true },
  email: { unique: true, type: "string", required: true },
  photoUrl: { unique: true, type: "string", required: true },
  name: { unique: true, type: "string", required: true },
  isAdmin: { type: "boolean", default: false },
});

const User = mongoose.model("User", userSchema);
export default User;
