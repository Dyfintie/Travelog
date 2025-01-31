import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
});

// const userModel = mongoose.model("user", userSchema);
const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
