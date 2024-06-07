import { FiMenu } from 'react-icons/fi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../Components/Footer';
import { getUserData, logout, updateUserToken } from '../Redux/Slices/AuthSlice';
import { useEffect, useState } from 'react';



function HomeLayout({ children }) {
    let date=new Date();
    // console.log(date.getHours());
    let time=false;
    if(date.getHours()>=18 && date.getHours()<=24){
        time=true;
    }
    else{
        time=false;
    }


    const dispatch = useDispatch();
    const navigate = useNavigate();


    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const role = useSelector((state) => state?.auth?.role);
    const UserData=useSelector(((state)=>state?.auth?.data));

    // const loadToken=async()=>{
    //     dispatch(getUserData());
    //     await dispatch(updateUserToken(UserData._id));
       
    // }
    
    useEffect(()=>{
      
    },[])
    
    function changeWidth() {
        const element = document.getElementsByClassName("drawer-side");
        element[0].style.width = "auto";
    }
    function hideDrawer() {
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;

        changeWidth();
    }

    async function handleLogout() {
        const res = await dispatch(logout());
        if (res.payload.success) {
            navigate("/");
        }
    }

    return (
        <div className='min-h-[90vh] '>
            <div className='drawer absolute left-0 z-50 w-fit '>
                <input className='drawer-toggle' id='my-drawer' type="checkbox" />
                <div className='drawer-content'>
                    <label htmlFor="my-drawer">
                        <FiMenu
                            onClick={changeWidth}
                            size={"32px"}
                            className='font-bold text-yellow-600 m-4'
                        />
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" className='drawer-overlay'>
                    </label>
                    <ul className='menu h-[100%] p-4 w-48 sm:w-80 bg-base-100 text-base-content '>
                        <li className='w-fit absolute right-2 z-50'>
                            <button>
                                <AiFillCloseCircle
                                    size={"24px"}
                                    onClick={hideDrawer}
                                />
                            </button>
                        </li>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        {
                         time &&
                         <li>
                            <Link to="/video/chat">Video Chat</Link>
                        </li>   
                        }
                        <li>
                            <Link to="/video">Videos</Link>
                        </li>

                        {!isLoggedIn && (
                            <>
                                <div className='w-full mt-4 flex items-center'>
                                    <button className=' border border-yellow-500 text-sm hover:bg-yellow-600 px-2 py-2 rounded-md w-full font-semibold text-teal-100'>
                                        <Link to="/login">Login</Link>
                                    </button>
                                    <button className='border border-yellow-500 ml-1 text-sm hover:bg-yellow-600 px-2 py-2 rounded-md w-full font-semibold text-teal-100'>
                                        <Link to="/signup">sign up</Link>
                                    </button>
                                </div>

                            </>
                        )}
                        {isLoggedIn && (
                            <div className='w-full flex items-center justify-around '>
                                <button className=' border border-yellow-500 hover:bg-yellow-600 px-3 py-3 rounded-md w-full font-semibold text-teal-100'>
                                    <Link to="/user/profile">Profile</Link>
                                </button>
                                <button className='border border-yellow-500 ml-1 hover:bg-yellow-600 px-3 py-3 rounded-md w-full font-semibold text-teal-100'>
                                    <Link onClick={handleLogout}>logout</Link>
                                </button>
                            </div>
                        )}
                        {
                            isLoggedIn &&
                            <li className="mt-4 p-2 font-semibold border border-green-400 rounded-md">
                                tokenCount : {UserData.tokenCount}
                            </li>
                        }
                        {
                            isLoggedIn && role=="ADMIN" &&
                            <Link to={"/video/create"}><li className='p-2 mt-4 font-semibold border bg-red-500 hover:bg-red-600'>Add Video</li></Link>
                        }
                    </ul>
                </div>
            </div>
            {children}
            <Footer />

        </div>


    )
}


export default HomeLayout;