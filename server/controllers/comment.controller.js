import AppError from "../Utils/AppErr.js";
import asyncHandler from "../middleware/asyncHandler.js";
import Comment from "../models/comments.model.js";

export const addComment=asyncHandler(async(req,res,next)=>{
    const {commentBody,userId,videoId}=req.body;
    
    if(!commentBody){
        return next(new AppError("comment is required"),403);
    }
    const comment=await Comment.create({
        userId,
        videoId,
        commentBody
    });
    await comment.save();
    res.status(200).json({
        success:true,
        message:"comment added successfully",
    })
    
});
export const getComment=asyncHandler(async(req,res,next)=>{
    const {videoId}=req.params;
    const comments=await Comment.find({"videoId":videoId});
    if(!comments){
        return next(new AppError("no comments found"),404);
    }
    res.status(200).json({
        success:true,
        message:"comments fetched successfully",
        comments
    })
});
export const deleteComment=asyncHandler(async(req,res,next)=>{
    try {
    const {id}=req.query;
    const comment=await Comment.findById(id);
    if(!comment){
        return next(new AppError("comment not found"),404);
    }
    // if(comment.userId.toString()!==userId.toString()){
    //     return next(new AppError("you are not authorized to delete this comment"),403);
    // };
    await Comment.deleteOne({"_id":id});
    res.status(200).json({
        success:true,
        message:"comment deleted successfully"
    })
    } catch (error) {
        return next(new AppError(error,403));
    }
});
