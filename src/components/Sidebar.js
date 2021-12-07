import "./sidebar.css";
import { IconButton, Avatar } from "@material-ui/core";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import SearchIcon from "@mui/icons-material/Search";
import Contact from "./Contact";
import { useStateValue } from "../Redux/Stateprovider";
import { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc, doc } from "firebase/firestore";
import db from "../firebase";
import { Button } from "@material-ui/core";
import { signOut, getAuth } from "@firebase/auth";
import { Link } from "react-router-dom";

const Sidebar = ({ lastMoment }) => {
  const [{ user }, dispatch] = useStateValue();
  const [seed, setseed] = useState(10);
  const [roomName, setroomName] = useState([]);

  const fetchRooms = async () => {
    await onSnapshot(collection(db, "rooms"), (snapshot) => {
      setroomName(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  };
  useEffect(() => {
    setseed(Math.floor(Math.random() * 1000));
    fetchRooms();
  }, []);

  const addchat = async () => {
    const roomName = prompt("enter room Name");

    if (roomName) {
      await addDoc(collection(db, "rooms"), {
        name: roomName,
      });
    }
  };

  const logOut = () => {
    signOut(getAuth());
    dispatch({
      type: "SET_USER",
      payload: null,
    });
  };

  const refresh = (e) => {
    e.preventDefault();
    window.location.href = "/";
  };

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <Avatar src={user?.photoURL} />
        <div className="sidebartop-icons">
          <IconButton onClick={() => refresh}>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
          {user && (
            <IconButton>
              <Button variant="contained" color="primary" onClick={logOut}>
                LogOut
              </Button>
            </IconButton>
          )}
        </div>
      </div>

      <div className="sidebar-middle">
        <div className="searchbar">
          <SearchIcon />
          <form>
            <input
              type="search"
              className="search"
              placeholder="search or start new chat"
            />
            <button type="submit">search</button>
          </form>
        </div>
      </div>

      <div className="sidebar-body">
        {true && (
          <h2
            style={{
              fontFamily: "san-serif",
              fontSize: "2rem",
              padding: "1rem 1rem 2rem",
            }}
            onClick={addchat}
          >
            Add New chat
          </h2>
        )}
        {roomName.map((room) => (
          <div>
          <Link to={`/chatTab/${room.id}`}>
            <Contact key={room.id}
              emoji={`https://avatars.dicebear.com/api/human/${
                seed + Math.random(Math.floor() * 1000)
              }.svg`}
              name={room.data.name}
              id={room.id}
            />
          </Link>
          
        </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
{
  /** <Contact 
              emoji={`https://avatars.dicebear.com/api/human/${
                seed + Math.random(Math.floor() * 1000)
              }.svg`}
              name={room.data.name}
              lastMessage="Where are you"
              id={room.id}
            /> */
}
