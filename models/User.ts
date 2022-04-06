import { Schema, models, model, Model } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User: Model<IUser> = models.User || model("User", UserSchema);

export interface IUser {
  name: string;
  email: string;
  password: string;
}
