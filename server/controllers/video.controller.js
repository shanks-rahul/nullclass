import AppError from "../Utils/AppErr.js";
import asyncHandler from "../middleware/asyncHandler.js";
import Video from "../models/video.model.js";
import fs from 'fs/promises';
import cloudinary from 'cloudinary';
import path from "path";
export const getAllVideos = asyncHandler(async (req, res, next) => {
    const videos = await Video.find({});
    res.status(200).json({
        success: true,
        message: "videos Fetched Successfully...",
        videos
    });
})
export const addVideos = asyncHandler(async (req, res, next) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return next(new AppError("All Fields are required",403));
    }
    const videos = await Video.create({
        title,
        description,
        video: {
            public_id: "Dummy",
            secure_url: "Dummy"
        }
    });
    if (!videos) {
        return next(new AppError("Unable to create video", 403));
    }
    if (req.file) {
        // console.log(req.file);
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'INTERNSHIP-NULLCLASS', 
                chunk_size: 80000000, // 80 mb size
                resource_type: 'video',
              });

            // If success
            if (result) {

                videos.video.public_id = result.public_id;
                videos.video.secure_url = result.secure_url;
            }


            fs.rm(`uploads/${req.file.filename}`);
        } catch (error) {

            for (const file of await fs.readdir('uploads/')) {
                await fs.unlink(path.join('uploads/', file));
            }

            return next(new AppError('File not uploaded, please try again',400));
        }
    }
    await videos.save();
    res.status(200).json({
        success: true,
        message: "Video created successfully...",
        videos
    })

});
export const deleteVideo=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const video=await Video.findById(id);
    if(!video){
        return next(new AppError("No Video Found",403));
    }
    await video.deleteMany();
    res.status(200).json({
        success:true,
        message:"video deleted successfully...",
    })

})