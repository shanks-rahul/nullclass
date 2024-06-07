import { Link } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import toast from "react-hot-toast";

function HomePage() {
    let date = new Date();
    // console.log(date.getHours());
    let time = false;
    if (date.getHours() >= 18 && date.getHours() <= 24) {
        time = true;
    }
    else {
        time = false;
    }
    return (
        <HomeLayout>
            <div className="flex items-center justify-center mx-16 gap-10 h-[90vh]">
                <div className="w-1/2 space-y-6">
                    <p className="text-2xl text-gray-200">
                        Watch Your Favourite and Latest Video.

                    </p>
                    <div className="flex items-center justify-start">
                        <Link to="/video">
                            <button className="bg-red-500 px-4 py-3 rounded-md text-white font-semibold text-lg hover:bg-red-600 transition:all ">
                                Explore Videos
                            </button>
                        </Link>
                        {
                            !time &&
                            <button 
                            onClick={()=>toast.error("Available only between 6PM to 12AM")}
                            className="ml-4 border border-green-500  text-white px-4 py-3 rounded-md font-semibold text-lg hover:bg-green-600 transition:all ">
                                    Video Chat
                            </button>


                        }
                        
                        {
                            time &&
                            <Link to="/video/chat">
                                <button className="ml-4 border border-green-500  text-white px-4 py-3 rounded-md font-semibold text-lg hover:bg-green-600 transition:all ">
                                    Video Chat
                                </button>
                            </Link>
                        }


                    </div>
                </div>

            </div>
        </HomeLayout>
    )
}

export default HomePage;
// 
