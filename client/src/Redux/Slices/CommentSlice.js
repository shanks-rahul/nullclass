import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../helpers/axiosInstance"
import axios from "axios"

const initialState={
    commentData:[]
}

export const addComment=createAsyncThunk("/video/comment",async(data)=>{
    try {

        const res=axiosInstance.post(`/comment`,data);
        toast.promise(res,{
            loading:"Adding comment...",
            success:"Comment added successfully",
            error:"unable to add comment"
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})
export const getComment=createAsyncThunk("/video/comment/get",async(data)=>{
    try {
        const res=axiosInstance.get(`/comment/${data.videoId}`);
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})
export const deleteComment=createAsyncThunk("/video/comment/delete",async(id)=>{
    try {
        const res=axiosInstance.delete(`/comment?id=${id}`);
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

const commentSlice=createSlice({
    name:"comment",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getComment.fulfilled,(state,action)=>{
            //console.log(action);
            state.commentData=action?.payload?.comments
        })

    }
})
export const {}=commentSlice.actions;
export default commentSlice.reducer;