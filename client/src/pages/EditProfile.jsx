import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import { updateUser } from "../Redux/Slices/AuthSlice";
import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import toast from "react-hot-toast";

function EditProfile(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        previewImage: "",
        fullName: "",
        avatar: undefined,
        UserId: useSelector((state) => state.auth.data._id),
    });

    function handleImageUpload(e) {
        e.preventDefault();
        const image = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(image);
        fileReader.addEventListener("load", function () {
            setUserInput({
                ...userInput,
                previewImage: this.result,
                avatar: image
            })
        })
    }
    function handleInput(e) {
        e.preventDefault();
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }
    async function onFormSubmit(e) {
        e.preventDefault();
        if (!userInput.fullName) {
            toast.error("Enter the Name Field");
            return;
        }
        let formData = new FormData();
        formData.append("fullName", userInput.fullName);
        formData.append("avatar", userInput.avatar);
        await dispatch(updateUser([userInput.UserId, formData]));

        await dispatch(getUserData());
        navigate("/user/profile");
    }



    return (
        <HomeLayout>
            <div className="flex items-center justify-center min-h-[90vh]">
                <form
                    noValidate
                    onSubmit={onFormSubmit}
                    className="flex flex-col gap-4 p-4 rounded-lg shadow-[0_0_10px_black] text-white min-h-[22rem] w-80"
                >
                    <h1 className="text-center text-2xl text-white font-bold">
                        Edit Profile
                    </h1>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="image_uploads" className="font-semibold cursor-pointer">
                            {userInput.previewImage ? (<img className="w-24 h-24 m-auto rounded-full " src={userInput.previewImage}></img>) : (
                                <BsPersonCircle className="w-24 h-24 m-auto rounded-full" />
                            )}
                        </label>
                        <input
                            onChange={handleImageUpload}
                            className="hidden"
                            type="file"
                            name="image_uploads"
                            id="image_uploads"
                            accept=".png,.jpg,.jpeg,.svg"
                        />
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
                            value={userInput.fullName}
                        />
                    </div>
                    <button type="submit" className="py-2 text-sm border bg-yellow-500 cursor-pointer rounded-md">
                        update profile
                    </button>
                    <Link
                        to="/user/profile"

                    >
                        <p className="link text-accent text-center flex items-center justify-center"><AiOutlineArrowLeft className=""></AiOutlineArrowLeft> Go to Profile Page</p>
                    </Link>

                </form>
            </div>
        </HomeLayout>
    )
}
export default EditProfile;