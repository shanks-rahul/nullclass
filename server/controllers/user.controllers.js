import AppError from "../Utils/AppErr.js";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/user.mode.js";
import fs from 'fs/promises';
import cloudinary from 'cloudinary';
const cookieOption={
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
}

export const register=asyncHandler(async(req,res,next)=>{
    const {fullName,email,password}=req.body;
    if(!email || !fullName || !password){
        return next(new AppError("All Fields are required",400));
    }
    const userExits=await User.findOne({email});
    if(userExits){
        return next(new AppError("User Already Exists",400));
    }
    const user=await User.create({
        fullName,
        email,
        password,
        tokenCount:0,
        avatar:{
            public_id:email,
            secure_url:"https://res.cloudinary.com/dyjl2cunt/image/upload/v1707121308/cld-sample-2.jpg"
        }
    });
    if(!user){
        return next(new AppError("Unable to create the account",400));
    }
    if (req.file) {
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'INTERNSHIP-NULLCLASS', 
                width: 250,
                height: 250,
                gravity: 'faces',
                crop: 'fill',
            });

            
            if (result) {
                
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;

                
                fs.rm(`uploads/${req.file.filename}`);
            }
        } catch (error) {
            return next(
                new AppError(error || 'File not uploaded, please try again', 400)
            );
        }
    }
    await user.save();
    const token=await user.generateJwtToken();
    user.password=undefined;
    res.cookie("token",token,cookieOption);
    res.status(200).json(({
        success:true,
        message:"Account created successfully",
        user
    }))
    

});
export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError("All Fields are required", 400));
    }
    const user = await User.findOne({ email }).select("+password");

    if (!(user && (await user.comparePassword(password)))) {
        return next(new AppError("user does not exist or password does not match", 400));
    }
    const token = await user.generateJwtToken();
    user.password = undefined;
    res.cookie("token", token, cookieOption);
    res.status(200).json({
        success: true,
        message: "user logged in successfully",
        user
    })
});
export const logout = asyncHandler(async (req, res, next) => {
    res.cookie("token", null, {
        secure: true,
        maxAge: 0,
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "user logged out successfully",
    })
})
export const getLoggedInUserDetails = asyncHandler(async (req, res, next) => {
  
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        message: "user details",
        user
    })
});

export const updateToken=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const user=await User.findById(id);
    if(!user){
        return next(new AppError('No user found',403));
    }
    user.tokenCount=user.tokenCount+5;

    await user.save();
    res.status(200).json({
        success:true,
        message:"token count updated successfully",
        user

    })
})

export const updateUser = asyncHandler(async (req, res, next) => {
    const { fullName } = req.body;
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
        return next(new AppError('Invalid user id or user does not exist'));
    }

    if (fullName) {
        user.fullName = fullName;
    }

    
    if (req.file) {
        
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);

        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'INTERNSHIP-NULLCLASS', 
                width: 250,
                height: 250,
                gravity: 'faces', // This option tells cloudinary to center the image around detected faces (if any) after  cropping or resizing the original image
                crop: 'fill',
            });

            
            if (result) {
                
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;

                
                fs.rm(`uploads/${req.file.filename}`);
            }
        } catch (error) {
            return next(
                new AppError(error || 'File not uploaded, please try again', 400)
            );
        }
    }

    
    await user.save();

    res.status(200).json({
        success: true,
        message: 'User details updated successfully',

    });
})