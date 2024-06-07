import { Schema,model} from "mongoose";
const videoSchema=new Schema({
    title:{
        type:String,
    },
    description:{
        type:String
    },
    video: {
        public_id: {
            type: String,
        },
        secure_url: {
            type: String,
        },
    },
});
const Video=model("Video",videoSchema);
export default Video;
