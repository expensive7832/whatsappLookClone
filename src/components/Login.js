import { Avatar, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import WifiIcon from "@mui/icons-material/Wifi";
import BatteryCharging50Icon from "@mui/icons-material/BatteryCharging50";
import SignalCellularConnectedNoInternet1BarIcon from "@mui/icons-material/SignalCellularConnectedNoInternet1Bar";
import "./login.css";
import image from "../assets/login2.jpeg";
import image2 from "../assets/loginImage.jpg";
import image3 from "../assets/download.png";
import Particles from "react-tsparticles";
import { addDoc, getDoc, collection , doc, Timestamp, onSnapshot } from "firebase/firestore";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import db, { provider, auth } from "../firebase";
import GoogleButton from "react-google-button";
import { useStateValue } from "../Redux/Stateprovider";

const Login = () => {
  const [{ user }, dispatch] = useStateValue();
  const [time, settime] = useState();

  const AuthChange = async () => {
    await onAuthStateChanged(auth, (userAuth) =>
      dispatch({
        type: "SET_USER",
        payload: userAuth,
      })
    );
  };

  useEffect(() => {
    setInterval(() => {
      settime(new Date().toLocaleTimeString());
    }, 1000);

    AuthChange();
  }, []);

  const signIn = async () => {
    try {
        const { user } = await signInWithPopup(auth, provider);
    } catch (error) {
      alert(error.messsage);
    }

    
  };

  return (
    <div className="login">
      {/**
       

             <Particles
        id="tsparticles"
        options={{
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
              },
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                value_area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 5,
            },
          },
          detectRetina: true,
        }}
      />

       */}

      <div className="login_design">
        <div className="login_topbar">
          <small>{time}</small>
          <div>
            <IconButton>
              <WifiIcon />
            </IconButton>
            <IconButton>
              <BatteryCharging50Icon />
            </IconButton>
            <IconButton>
              <SignalCellularConnectedNoInternet1BarIcon />
            </IconButton>
          </div>
        </div>
        <div className="login_center">
          <img src={image} alt="login image" />
          <h1>All people one place</h1>
          <small>chat your friend in one place by signing up </small>
          <div className="randomImage">
            <img src={image} alt="" />
            <img src={image2} alt="" />
            <img src={image} alt="" />
            <img src={image2} alt="" />
            <img
              src={image3}
              alt=""
              style={{ width: "5rem", backgroundColor: "none" }}
            />
          </div>

          <div className="signin">
            <GoogleButton disabled={user} type="dark" onClick={signIn} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
