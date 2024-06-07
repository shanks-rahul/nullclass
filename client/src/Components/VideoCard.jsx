import { useNavigate } from "react-router-dom";
import CustomVideoPlayer from "../pages/CustomVideoPlayer";

function VideoCard({data}){
    const navigate=useNavigate();

    return(
        <div
            onClick={()=>navigate("/video/description/",{state:{...data}})} 
            className="bg-zinc-700 text-white w-[22rem] h-[300px] shadow-lg rounded-lg cursor-auto group overflow-hidden">
            <div className="overflow-hidden">
                <CustomVideoPlayer videoUrl={data?.video?.secure_url}/>
                <div className="p-3 space-y-1 text-white">
                    <h2 className="text-xl font-bold text-red-500 line-clamp-2">
                        {data?.title}
                    </h2>
                    <p className="line-clamp-2">
                        {data?.description}
                    </p>
                    
                </div>
                

            </div>
        </div>
    )
}
export default VideoCard;