import React from "react";
import ChatTab from "../components/ChatTab";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar";
import { useStateValue } from "../Redux/Stateprovider";
import "./home.css";


const Home = () => {

    const [{user}, dispatch] = useStateValue();

  return (
    <>
      {!user ? (
        <Login />
      ) : (
        <div className="home">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="chatTab">
            <ChatTab />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
