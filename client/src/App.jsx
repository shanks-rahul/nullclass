import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import HomePage from "./pages/HomePage"
import DeniedPage from "./pages/denied"
import Videochat from "./pages/VideoChat"
import RoomPage from "./pages/RoomPage"
import RequireAuth from "./helpers/Auth/RequireAuth"
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile"
import CreateVideo from "./pages/Admin/CreateVideo"
import VideoPage from "./pages/VideoPage"
import VideoDescriptionPage from "./pages/VideoDescriptionPage"

function App() {
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
    <Routes>
      <Route path="/" element={<HomePage />} />
      {

      }

      <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
        {time &&
          <>
            <Route path="/room/:roomId" element={<RoomPage />} />
            <Route path="/video/chat" element={<Videochat />} />
          </>
        }
        
      </Route>
      <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
        <Route path="/video/create" element={<CreateVideo />} />
      </Route>
      <Route path="/video" element={<VideoPage />} />
      <Route path="/denied" element={<DeniedPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/user/profile" element={<Profile />} />
      <Route path="/user/editprofile" element={<EditProfile />} />
      <Route path="/video/description" element={<VideoDescriptionPage/>}/>
    </Routes>
  )
}

export default App
