import {Schema, model} from "mongoose";
const commentSchema=new Schema({
    userId:{
        type:String,
        required:true
    },
    videoId:{
        type:String,
        required:true,
    },
    commentBody:{
        type:String,
    }
},{
    timestamps:true
});
const Comment=model("Comment",commentSchema);
export default Comment;
