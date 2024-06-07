import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../Redux/Slices/AuthSlice";
import { Link } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";

function Profile(){
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getUserData());
    },[])
    const userData=useSelector((state)=>state?.auth?.data);

    return(
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center">
                <div className="flex flex-col gap-4 p-4 text-white  shadow-[0_0_10px_black] rounded-lg my-10 ">
                    <img
                        src={`${userData.avatar.secure_url} `}
                        className="w-[7rem] h-[7rem] m-auto rounded-full border border-black"
                    >
                    </img>
                    <h3 className="text-lg font-semibold text-center capitalize">
                        {userData?.fullName}
                    </h3>
                    <div className="grid grid-cols-2 ">
                        <p className="">Email :</p><p className="text-center mr-2">{userData?.email}</p>
                        <p>Role :</p><p>{userData?.role}</p>
                        <p>tokenCount :</p><p>{userData?.tokenCount}</p>
                        
                    </div>
                    <div className="flex items-center justify-center">
                        
                        <Link
                            to="/user/editprofile"
                            className=" rounded-md text-center w-1/2 bg-yellow-500 hover:bg-yellow-600 cursor-pointer py-2 text-sm transition-all ease-in-out"
                        >
                            <button>Edit Profile</button>
                        
                        </Link>
                    </div>
                    
                </div>

            </div>
        </HomeLayout>
    )
}
export default Profile;