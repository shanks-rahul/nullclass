import { useState } from "react";
import HomeLayout from "../layouts/HomeLayout";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { register } from "../Redux/Slices/AuthSlice";

function Signup() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        password: "",
        avatar: undefined,
        previewImage: ""
    })
    const handleInput = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!signupData.fullName || !signupData.email || !signupData.password) {
            toast.error("All Fields are required");
            return;
        }
        const formData = new FormData();
        formData.append("fullName", signupData.fullName);
        formData.append("email", signupData.email);
        formData.append("password", signupData.password);
        formData.append("avatar", signupData.avatar);
        const res = await dispatch(register(formData));
        console.log(res);
        if (res?.payload?.success) {
            setSignupData({
                fullName: "",
                email: "",
                password: "",
                previewImage: "",
                avatar: undefined
            })
            navigate("/login");
            toast.success("Account Created Successfully");
        }
    }
    const uploadImage = (e) => {
        e.preventDefault();
        let uploadedImage = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        fileReader.addEventListener('load', function () {
            setSignupData({
                ...signupData,
                previewImage: this.result,
                avatar: uploadedImage
            })
        })
    }
    return (
        <HomeLayout>
            <div className="flex justify-center items-center h-[90vh]">
                <form noValidate onSubmit={handleSubmit} className="flex flex-col justify-center px-3 py-6 rounded-lg w-96 text-white shadow-[0_35px_60px_-15px_black]">
                    <h1 className="text-center font-bold text-2xl mb-2">Registration Page</h1>
                    <div className="flex flex-col gap-1 mb-2">
                        <label htmlFor="image_uploads" className="font-semibold cursor-pointer">
                            {signupData.previewImage ? (<img className="w-24 h-24 m-auto rounded-full " src={signupData.previewImage}></img>) : (
                                <BsPersonCircle className="w-24 h-24 m-auto rounded-full" />
                            )}
                        </label>
                        <input
                            onChange={uploadImage}
                            className="hidden"
                            type="file"
                            name="image_uploads"
                            id="image_uploads"
                            accept=".png,.jpg,.jpeg"
                        />
                    </div>
                    <div className="flex flex-col gap-1 mb-2">
                        <label htmlFor="fullName" className="font-semibold">
                            Name
                        </label>
                        <input

                            type="text"
                            required
                            name="fullName"
                            id="fullName"
                            placeholder="enter your name"
                            className="bg-slate-800 px-2 py-1 border"
                            onChange={handleInput}
                            value={signupData.fullName}
                        />
                    </div>
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
                            value={signupData.email}
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
                            value={signupData.password}
                        />
                    </div>
                    <button type="submit" className="bg-red-500 hover:bg-red-700 transition-all ease-in-out cursor-pointer py-2 mt-2 rounded-lg">Create Account
                    </button>
                    <p className="text-center mt-2">
                        Already Have An Account? <Link to="/login" className="link text-accent cursor-pointer">Login</Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    )
}
export default Signup;