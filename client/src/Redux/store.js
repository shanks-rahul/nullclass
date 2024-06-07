import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice";
import videoSliceReducer from "./Slices/VideoSlice";
import CommentSliceReducer from "./Slices/CommentSlice";

const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        video:videoSliceReducer,
        comment:CommentSliceReducer
    },
    devTools:true,
})
export default store;