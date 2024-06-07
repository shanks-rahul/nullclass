import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../helpers/axiosInstance"

const initialState = {
    videoData: []
}

export const getAllVideos = createAsyncThunk("/video/AllVideos", async () => {
    try {
        const res = axiosInstance.get("/video");
        return (await res).data;
    } catch (error) {
        toast.error(error?.resonse?.data?.message);
    }
})
export const addVideo = createAsyncThunk("/video/addVideo", async (data) => {

    try {
        let formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("video", data.video);
        const res = axiosInstance.post("/video", formData);
        toast.promise(res, {
            success: "video added successfully...",
            loading: "adding video...",
            error: "something went wrong"
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.resonse?.data?.message);
    }

})


const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllVideos.fulfilled, (state, action) => {
                state.videoData=action?.payload?.videos
            })
            .addCase(addVideo.fulfilled, (state, action) => {
                console.log(action);
            })
    }
})
export const { } = videoSlice.actions;
export default videoSlice.reducer;