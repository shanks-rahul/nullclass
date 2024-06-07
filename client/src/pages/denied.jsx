import { useNavigate } from "react-router-dom";

function DeniedPage(){
    const navigate=useNavigate();
    return(
        <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
            <h1 className="text-9xl font-extrabold text-white">
                403
            </h1>
            <div className="bg-black text-white px-2 text-sm rounded rotate-12 absolute">
                Access Denied
            </div>
            <button className="border border-red-500 hover:bg-red-600 px-3 py-2 mt-5 rounded-md">
                <a className="text-white text-sm">
                    <span onClick={()=>{navigate(-1)}}>Go Back</span>
                </a>
            </button>
        </main>
    )
}

export default DeniedPage;