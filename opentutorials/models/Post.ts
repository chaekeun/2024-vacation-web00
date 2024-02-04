import mongoose, { Document, Schema } from "mongoose";

export interface IPost extends Document {
  category: string;
  title: string;
  content: string;
}

const PostSchema = new Schema<IPost>({
  category: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const PostModel = mongoose.model<IPost>("Post", PostSchema);

export default PostModel;
