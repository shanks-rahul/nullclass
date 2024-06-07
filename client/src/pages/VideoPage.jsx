import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllVideos } from "../Redux/Slices/VideoSlice";
import HomeLayout from "../layouts/HomeLayout";
import { useEffect } from "react";
import VideoCard from "../Components/VideoCard";

function VideoPage(){
    const dispatch=useDispatch();
    //const navigate=useNavigate();
    const {videoData}=useSelector((state)=>state.video);

    async function loadAllCourse(){
        await dispatch(getAllVideos());
    }
    useEffect(()=>{
        loadAllCourse();
        //console.log(videoData);
    },[])

    
    
    return(
        <HomeLayout>
            <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
                <h1>
                    Explore the Videos
                    
                </h1>
                <div className="mb-10 flex flex-wrap gap-14">
                        {videoData.map((element)=>{
                            return <VideoCard key={element._id}  data={element} />;
                        })}
                    </div>
            </div>
        </HomeLayout>
    )
}
export default VideoPage;