import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect((process.env.MONGODB_URI));
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;

// import mongoose, { Schema } from "mongoose";

// const topicSchema = new Schema(
//   {
//     title: String,
//     description: String,
//   },
//   {
//     timestamps: true,
//   }
// );

// const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

// export default Topic;
