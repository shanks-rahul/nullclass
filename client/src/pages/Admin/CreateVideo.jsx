import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { addVideo } from "../../Redux/Slices/VideoSlice";

function CreateVideo(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // useEffect(() => {
        
    // }, []);

    const [userInput, setUserInput] = useState({
        title: "",
        description: "",
        video:undefined,
        videoSrc: "",
    })

    function handleInput(e) {
        e.preventDefault();
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }
    function handleVideo(e) {
        e.preventDefault();
        const video = e.target.files[0];
        const videoUrl = window.URL.createObjectURL(video);
        setUserInput({
            ...userInput,
            video: video,
            videoSrc: videoUrl
        })
    };
    async function onFormSubmit(e) {
        e.preventDefault();
        if (!userInput.title || !userInput.description) {
            toast.error("All Fields are Require");
            return;
        }
        const res = await dispatch(addVideo(userInput));
        if (res?.payload?.success) {
            setUserInput({
                video: undefined,
                title: "",
                description: "",
                videoSrc: "",
            })
            navigate(-1);
        }
    }



    return (
        <HomeLayout>
            <div className="min-h-[90vh] text-white flex flex-col items-center justify-center gap-10 mx-16">
                <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
                    <header className="flex items-center justify-center relative ">
                        <button className="absolute left-2 text-xl text-green-500"
                            onClick={() => navigate(-1)}
                        >
                            <AiOutlineArrowLeft />
                        </button>
                        <h1 className="text-xl text-yellow-500 font-semibold">
                            Add New Video
                        </h1>
                    </header>
                    <form noValidate onSubmit={onFormSubmit} className="flex flex-col gap-3">
                        <input
                            type="text"
                            name="title"
                            placeholder="enter the title"
                            onChange={handleInput}
                            className="px-3 py-1 border bg-transparent"
                            value={userInput.title}
                        />
                        <textarea
                            type="text"
                            name="description"
                            placeholder="enter the description"
                            onChange={handleInput}
                            className="px-3 py-1 border bg-transparent resize-none overflow-y-scroll h-36"
                            value={userInput.description}
                        >

                        </textarea>
                        {userInput.videoSrc ? (
                            <video
                                src={userInput.videoSrc}
                                controls
                                controlsList="nodownload"
                                disablePictureInPicture
                                className="object-fill rounded-tl-lg rounded-tr-lg w-full"


                            >

                            </video>
                        ) : (
                            <div className="h-48 border flex items-center justify-center cursor-pointer">
                                <label htmlFor="episode">Choose your video</label>
                                <input type="file" className="hidden" name="episode" id="episode" onChange={handleVideo} accept="video/mp4 video/xmp4 video/*" />
                            </div>
                        )
                        }
                        <button className="w-full px-3 py-2 bg-red-500 cursor-pointer hover:bg-red-600 text-white transition all ease-in-out " type="submit">
                            Add New Video
                        </button>
                    </form>
                </div>

            </div>
        </HomeLayout>
    )

}
export default CreateVideo;