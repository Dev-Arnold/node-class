import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content:{
        type:String,
        required:true
    }
}, {timestamps:true})


const Comment = mongoose.model("Comment", commentSchema);
export default Comment;