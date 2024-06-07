import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
function RoomPage() {
    const { roomId } = useParams();
    const myMeeting = async (element) => {
        const appId = 1219997912;
        const serverSecret = "be70fa116c0fcf778da8a70ade74ffa4";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appId, serverSecret, roomId, Date.now().toString(), "Rahul Agarwalla");
        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Copy Link',
                    url: `http://localhost:5137/room/${roomId}`
                }
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            screenSharingConfig: {
                resolution: ZegoUIKitPrebuilt.ScreenSharingResolution_720P
            },
            
        })
    }
    return (
        
            <div className="mt-4">
                <div className="" ref={myMeeting} />
            </div>
        
    )

}
export default RoomPage;