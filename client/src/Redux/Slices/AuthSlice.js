import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') != undefined ? JSON.parse(localStorage.getItem('data')) : "",
}

export const register = createAsyncThunk("/auth/register", async (data) => {
    
    try {
        const res = axiosInstance.post("/user/signup", data);
        toast.promise(res, {
            loading: "creating account...",
            success: "account created successfully",
            error:"something went wrong"

        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const login = createAsyncThunk("/auth/login", async (data) => {
    try {
        const res = axiosInstance.post("/user/signin", data);
        toast.promise(res, {
            loading: "logging in",
            success: "logged in successfully",
            error: (error) => {
                error?.response?.data?.message || "something went wrong";
            }
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})
export const logout = createAsyncThunk("/auth/logout", async () => {
    try {
        const res = axiosInstance.post("/user/logout");
        toast.promise(res, {
            loading: "logging out",
            success: "logged out successfully",
            error: (error) => {
                error?.response?.data?.message || "something went wrong";
            }
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})
export const updateUser = createAsyncThunk("/auth/update", async (data) => {
    
    try {
        const res = axiosInstance.put(`/user/update/${data[0]}`,data[1]);
        toast.promise(res, {
            loading: "updating account...",
            success: "account updated successfully",
            error: (error) => {
                error?.response?.data?.message || "something went wrong";
            }
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})
export const getUserData = createAsyncThunk("/auth/me", async () => {
    try {
        const res = axiosInstance.get('/user/me');
        return (await res).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})
export const updateUserToken = createAsyncThunk("/auth/token", async (cid) => {
    try {
        const res = axiosInstance.get(`/user/updateToken/${cid}`);
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                console.log(action);
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("data", JSON.stringify(action?.payload?.user));
                localStorage.setItem("role", action?.payload?.user?.role);
                state.isLoggedIn = true;
                state.data = action?.payload?.user;
                state.role = action?.payload?.user?.role;
            })
            .addCase(logout.fulfilled, (state) => {
                localStorage.clear();
                state.isLoggedIn = false;
                state.data = {};
                state.role = "";
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                localStorage.setItem("data", JSON.stringify(action?.payload?.user));
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("role", action?.payload?.user?.role);
                state.isLoggedIn = true;
                state.data = action?.payload?.user;
                state.role = action?.payload?.user?.role;
            })
            // .addCase(updateUserToken.fulfilled, (state, action) => {
            //     localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            //     localStorage.setItem("isLoggedIn", true);
            //     localStorage.setItem("role", action?.payload?.user?.role);
            //     state.isLoggedIn = true;
            //     state.data = action?.payload?.user;
            //     state.role = action?.payload?.user?.role;
            // })


    }
})

export const { } = authSlice.actions;
export default authSlice.reducer;