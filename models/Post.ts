import { Schema, models, model, Model } from "mongoose";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    imagePath: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Post: Model<IPost> = models.Post || model("Post", PostSchema);

export interface IPost {
  title: string;
  content: string;
  imagePath?: string;
}
