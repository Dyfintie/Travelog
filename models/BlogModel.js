import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
  title: String,
  email: String,
  author: String,
  file: String,
  content: String,
  upvoters: Array,
  upvotes: {
    type: Number,
    default: 0,
  },
  date_created: String,
});
const blogModel = mongoose.models.nlog || mongoose.model("nlog", blogSchema);
export default blogModel;
