import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image:{
      type: String
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    profile:{
      type: mongoose.Types.ObjectId,
      ref: "UserProfile",
      default:null
    },
    posts:[
      {
        type: mongoose.Types.ObjectId,
        ref: "Post",
      }
    ],
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
