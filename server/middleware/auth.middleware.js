import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import AppError from "../Utils/AppErr.js";
export const isLoggedIn=asyncHandler(async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new AppError("User Unauthorized ! Please Login Again",403));
    }
    const decoded=await jwt.verify(token,process.env.SECRET);
    if(!decoded){
        return next(new AppError("User Unauthorized ! Please Login Again",403));
    }
    req.user=decoded;
    //console.log(req.user)
    next();
});
export const authorizedRole=(...roles)=>asyncHandler(async(req,res,next)=>{
    const role=req.user.role;
    if(!roles.includes(role)){
        return next(new AppError("You are not authorized to access this route...",403));
    }
    next();
})