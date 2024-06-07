import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { getUserData, updateUserToken } from '../Redux/Slices/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';

const CustomVideoPlayer = ({ videoUrl }) => {

  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    // Function to get the user's location
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather);
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    };

    // Function to fetch weather data
    const getWeather = async (position) => {
      const { latitude, longitude } = position.coords;
      const apiKey = '170aa68a73cb978bac0f6fc01cf96c62';
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

      try {
        const response = await axios.get(url);
        const data = await response.data;
        
        const arrData=[data];
        setCity(arrData[0].name);
        setTemperature(arrData[0].main.temp);
        
      } catch (error) {
        alert(error);
      }
    };
    getLocation();
  }, []);


  const dispatch=useDispatch();
  const UserData=useSelector(((state)=>state?.auth?.data));

    const loadToken=async()=>{
        dispatch(getUserData());
        await dispatch(updateUserToken(UserData._id));
       
    }
    
  const playerRef = useRef(null);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [speed, setSpeed] = useState(1);

  const handleClick = (e) => {
    //console.log(clickCount);
    const now = new Date().getTime();
    const timeSinceLastClick = now - lastClickTime;

    if (timeSinceLastClick < 500) {
      setClickCount(clickCount + 1);
    } else {
      setClickCount(1);
    }

    setLastClickTime(now);

    if (clickCount + 1 === 3) {
      handleTripleClick(e);
    } else if (clickCount === 1) {
      setTimeout(() => {
        if (clickCount === 1) {
          handleSingleClick(e);
        }
        setClickCount(0);
      }, 500);
    }
  };

  const handleSingleClick = (e) => {
    const middleSection = window.innerWidth / 3;
    const rightSection = (window.innerWidth / 3) * 2;
    
    if (e.clientX < middleSection) {
      // Single-tap on left side
      playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10, 'seconds');
    } else if (e.clientX > rightSection) {
      // Single-tap on right side
      playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10, 'seconds');
    }
  };

  const handleTripleClick = (e) => {
    const middleSection = window.innerWidth / 3;
    const rightSection = (window.innerWidth / 3) * 2;
    
    if (e.clientX < middleSection) {
      alert("comments section");
    } else if (e.clientX > rightSection) {
      
    } else {
      toast.success(city);
      toast.success(temperature+"C");
      
    }
  };

  const handleLongPress = (e, side) => {
    if (side === 'left') {
      setSpeed(0.5);
    } else if (side === 'right') {
      setSpeed(2);
    }
  };

  const handleMouseDown = (e) => {
    const middleSection = window.innerWidth / 3;
    const rightSection = (window.innerWidth / 3) * 2;
    let timeout;

    if (e.clientX < middleSection) {
      timeout = setTimeout(() => handleLongPress(e, 'left'), 500);
    } else if (e.clientX > rightSection) {
      timeout = setTimeout(() => handleLongPress(e, 'right'), 500);
    }

    const clear = () => {
      clearTimeout(timeout);
      setSpeed(1);
    };

    document.addEventListener('mouseup', clear, { once: true });
    document.addEventListener('mouseleave', clear, { once: true });
  };

  const handleVideoEnd = () => {
    loadToken();
  };

  return (
    <div
      style={{ position: 'relative' }}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onContextMenu={(e) => e.preventDefault()}
    >
      <video
        onClick={handleClick}
        ref={playerRef}
        src={videoUrl}
        // playing={true}
        // playbackRate={speed}
        controls
        width="100%"
        height="100%"
        onEnded={handleVideoEnd}
      ></video>
     </div>
  );
};


export default CustomVideoPlayer;
