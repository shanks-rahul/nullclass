import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../Redux/Slices/AuthSlice";
import { useState } from "react";
import HomeLayout from "../layouts/HomeLayout";
import toast from "react-hot-toast";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [signinData, setSigninData] = useState({
        email: "",
        password: "",
    })
    const handleInput = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setSigninData({
            ...signinData,
            [name]: value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!signinData.email || !signinData.password) {
            toast.error("All Fields are required");
            return;
        }
        const res = await dispatch(login(signinData));
        if (res?.payload?.success) {
            setSigninData({
                email: "",
                password: "",
            })
            navigate("/");
            toast.success("logged in Successfully");
        }
    }

    return (
        <HomeLayout>
            <div className="flex justify-center items-center h-[90vh]">
                <form noValidate onSubmit={handleSubmit} className="flex flex-col justify-center px-3 py-6 rounded-lg w-96 text-white shadow-[0_35px_60px_-15px_black]">
                    <h1 className="text-center font-bold text-2xl mb-2">Login Page</h1>


                    <div className="flex flex-col gap-1 mb-2">
                        <label htmlFor="email" className="font-semibold">
                            Email
                        </label>
                        <input

                            type="email"
                            required
                            name="email"
                            id="email"
                            placeholder="enter your email"
                            className="bg-slate-800 px-2 py-1 border"
                            onChange={handleInput}
                            value={signinData.email}
                        />
                    </div>
                    <div className="flex flex-col gap-1 mb-2">
                        <label htmlFor="password" className="font-semibold">
                            Password
                        </label>
                        <input

                            type="password"
                            required
                            name="password"
                            id="password"
                            placeholder="enter your Password"
                            className="bg-slate-800 px-2 py-1 border"
                            onChange={handleInput}
                            value={signinData.password}
                        />
                    </div>
                    <button type="submit" className="bg-red-500 hover:bg-red-700 transition-all ease-in-out cursor-pointer py-2 mt-2 rounded-lg">Login
                    </button>
                    <p className="text-center mt-2">
                        Do Not Have An Account? <Link to="/signup" className="link text-accent cursor-pointer">Sign Up</Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    )
}
export default Login;