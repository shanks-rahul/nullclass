import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addComment, deleteComment, getComment } from "../Redux/Slices/CommentSlice";
import CustomVideoPlayer from "./CustomVideoPlayer";

function VideoDescriptionPage() {
   
    function refreshPage() {
        //window.location.reload(false);
    }
    const dispatch = useDispatch();
    const { state } = useLocation();
    const { isLoggedIn, role, data } = useSelector((state) => state.auth);
    //const {videoData}=useSelector((state)=>state.video);
    const { commentData } = useSelector((state) => state.comment);
    const [cmtInput, setCmtInput] = useState({
        commentBody: "",
        userId: data._id,
        videoId: state._id
    })

    const loadToken=async()=>{
        
        await dispatch(updateUserToken(data._id));
        dispatch(getUserData());
       
    }
    function handleEnded(){
        loadToken();
    }

    function handleInput(e) {
        e.preventDefault();
        const { name, value } = e.target;
        setCmtInput({
            ...cmtInput,
            [name]: value
        })
    }
    async function handleSubmit(e) {
        e.preventDefault();
        if (!cmtInput.commentBody) {
            toast.error("comment cannot be empty");
        }
        const res = await dispatch(addComment(cmtInput));
        await dispatch(getComment(cmtInput));
        refreshPage();
        //console.log(res);
        if (res?.payload?.success) {
            toast.success("comment added successfully");
            setCmtInput({
                commentBody: "",
                userId: data._id,
                videoId: state._id
            })
        }
    }
    useEffect(() => {
        //console.log(state._id);
        dispatch(getComment(cmtInput));
    }, [])
    async function deleteComments(index){
        const res=await dispatch(deleteComment(commentData[index]._id));
        if(res?.payload?.success){
            toast.success("comment deletd succesfully");
        }
        refreshPage();
        await dispatch(getComment(cmtInput));
    }


    return (
        <HomeLayout>
            <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white  ">

                <div className="flex justify-center gap-10 w-full">
                    <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                        {/* <video
                            
                            src={state.video.secure_url}
                            className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                            controls
                            disablePictureInPicture
                            muted
                            controlsList="nodownload"
                            onEnded={loadToken}
                        >
                        </video> */}
                        <CustomVideoPlayer videoUrl={state.video.secure_url}/>
                        <div>
                            <h1>
                                <span className="text-red-500 font-semibold">Title: {" "} </span>
                                {state?.title}
                            </h1>
                            <p>
                                <span className="text-red-500 font-semibold">Description : {" "}
                                </span>
                                {state.description}
                            </p>
                        </div>
                    </div>
                    <ul className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                        <li className="text-red-500 font-semibold flex items-center justify-between ">
                            <p>
                                comments
                            </p>
                            <div className="flex space-x-2">
                                <label htmlFor="commentBody"></label>
                                <input
                                    className="px-2"
                                    type="text"
                                    placeholder="add your comment"
                                    name="commentBody"
                                    onChange={handleInput}
                                    value={cmtInput.commentBody}

                                />
                                <button onClick={(e) => handleSubmit(e)} className="px-2 py-1 border bg-red-500 text-white hover:bg-red-600">add</button>
                            </div>
                            <div>

                            </div>

                        </li>

                        {commentData?.map((item, index) => {
                            return (
                                <div key={index} className="flex justify-between mx-2 shadow-md">
                                    <li className="p-1">{item.commentBody}</li>
                                    {item.userId===data._id &&
                                        <button onClick={()=>{deleteComments(index);console.log(index)}}>delete</button>
                                    }
                                </div>
                            )
                        })}


                    </ul>
                </div>

            </div>
        </HomeLayout>
    )

}
export default VideoDescriptionPage