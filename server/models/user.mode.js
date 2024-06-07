import { Schema,model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const UserSchema=new Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Please provide your Email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill in a valid email address',
        ],
    },
    password:{
        type:String,
        required:[true,"please provide a strong password"],
        select:false,
        minlength:[8,"password must be of atleast 8 characters"]
    },
    avatar: {
        public_id: {
            type: String,
        },
        secure_url: {
            type: String,
        },
    },
    tokenCount:{
        type:Number,
        default:0
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    }
},{
    timestamps:true
});
UserSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password=await bcrypt.hash(this.password,10);
})
UserSchema.methods={
    generateJwtToken:async function(){
        return await jwt.sign(
            {id:this._id,role:this.role,tokenCount:this.tokenCount},
            process.env.SECRET,
            {
                expiresIn:'24h'
            }
        )
    },
    comparePassword:async function(plainPassword){
        return await bcrypt.compare(plainPassword,this.password);
    }
};
const User=model("User",UserSchema);
export default User;