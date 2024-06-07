import { useCallback, useState } from "react";
import HomeLayout from "../layouts/HomeLayout";
import { useNavigate } from "react-router-dom";

function Videochat(){
    const navigate=useNavigate();
    const [value,setValue]=useState("");
    const handleJoinroom=useCallback(()=>{
        navigate(`/room/${value}`)
    },[navigate,value]);
    return(
        <HomeLayout>
            <div className="h-[90vh] flex items-center justify-center">
                <div className="flex justify-center items-center space-x-2">
                    <div>
                        <input 
                        value={value}
                        onChange={(e)=>setValue(e.target.value)}
                        className="px-3 py-2" type="text" placeholder="Enter room code"/>
                    </div>
                    <button onClick={handleJoinroom} className="px-3 py-2 rounded-md bg-green-400 text-white hover:bg-green-600 transition-all ease-in">Join</button>
                </div>
            </div>
        </HomeLayout>
    )
}
export default Videochat;