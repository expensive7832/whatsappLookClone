import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CollectionsIcon from "@mui/icons-material/Collections";
import SendIcon from "@mui/icons-material/Send";
import { Mic } from "@mui/icons-material";
import "./chattab.css";
import Moment from "react-moment";
import { deleteObject, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  doc,
  onSnapshot,
  query,
  getDocs,
  orderBy,
  getDoc,
  collection,
  setDoc,
  addDoc,
  Timestamp,
  deleteDoc,
} from "firebase/firestore";
import db, { storage } from "../firebase";
import { useParams } from "react-router";
import { useStateValue } from "../Redux/Stateprovider";
import { Link } from "react-router-dom";

const ChatTab = () => {
  const [{ user }, dispatch] = useStateValue();
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [chat, setChat] = useState([]);
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [imgPath, setImgPath] = useState("");
  const [lastMessage, setLastMessage] = useState({});

  useEffect(() => {
    if (img) {
      const imgUpload = async () => {
        const storageRef = ref(storage, `assets/${img.name}`);

        const path = await uploadBytes(storageRef, img);
        setImgPath(path.ref.fullPath);
        await getDownloadURL(ref(storage, path.ref.fullPath)).then(
          (downloadURL) => {
            setImgUrl(downloadURL);
          }
        );
      };

      imgUpload();

      return () => {
        imgUpload();
      };
    }
  }, [img]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "messages", roomName.id, "chat"), {
      message: text,
      name: user.displayName,
      imgPath: imgPath,
      img: imgUrl,
      time: Timestamp.fromDate(new Date()),
    });

    await setDoc(doc(db, "lastMsg", roomName.id), {
      imgUrl: imgUrl ,
      message: text,
      name: user.displayName,
      time: Timestamp.fromDate(new Date()),
      unread: true,
    });

    setText("");
    setImgPath("");
    setImgUrl("");
  };

  const deleteText = async (id) => {
    const docRef = doc(db, "messages", roomName.id, "chat", id);

   await onSnapshot(docRef, (doc) =>{
     if(doc?.data()?.imgPath){
        deleteObject(ref(storage, doc?.data()?.imgPath))
     }
    })

   const messageRef = doc(db, "messages", roomName.id, "chat", id);
    await deleteDoc(messageRef);
  };

  const chatMessage = async () => {
    const colRef = collection(db, "messages", String(roomId), "chat");

    const q = query(colRef, orderBy("time", "asc"));

    onSnapshot(q, (querysnap) => {
      setChat(
        querysnap.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  };

  const lastMoment = async () => {
    await onSnapshot(doc(db, "lastMsg", String(roomId)), (doc) => {
      setLastMessage(doc.data());
    });
  };

  useEffect(() => {
    getDoc(doc(db, "rooms", String(roomId))).then((docSnap) => {
      setRoomName({
        id: docSnap.id,
        name: docSnap.data()?.name,
      });
    });

    chatMessage();
    lastMoment();
  }, [roomId]);

  const [seed, setseed] = useState(5);

  useEffect(() => {
    setseed(Math.floor(Math.random() * 1000));
  }, []);

  const time = new Date().toLocaleTimeString();

  

  return (
    <div className="chatTab">
      <div className="chatTab_header">
        <div className="chatTab_header_info">
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
          <div className="chatTab_header_info_title">
            <h4>{roomName.name}</h4>
            <small>
              {lastMessage && (
                <Moment fromNow>{lastMessage?.time?.toDate()}</Moment>
              )}
            </small>
          </div>
        </div>
        <div className="chatTab_header_sidebar">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <article className="chatTab_body">
        {chat.map((chats) => (
          <div
            key={chats.id}
            onDoubleClick={() =>
              user?.displayName === chats?.data?.name && deleteText(chats.id)
            }
            className={`textBody ${
              user?.displayName === chats?.data?.name && "sender"
            }`}
          >
            <i
              style={{ color: "#fff", fontSize: ".9rem", marginLeft: "1rem" }}
              className="topName"
            >
              {chats?.data?.name.split(" ")[0]}
            </i>
            <div
              className={`Text ${
                user?.displayName === chats?.data?.name && "sendText"
              }`}
            >
              {chats?.data?.img && 
              <a target="blank" href={chats?.data?.img}><img src={chats?.data?.img} style={{width: "6rem",  objectFit: "contain"}}/></a>
              }
              <p>{chats?.data?.message}</p>
              <small style={{fontSize: ".7rem" }}>
                <Moment style={{ paddingTop: ".4rem" }} fromNow>
                  {chats?.data?.time.toDate()}
                </Moment>
              </small>
            </div>
          </div>
        ))}
      </article>

      <div className="chatTab_footer">
        
        <form onSubmit={handlesubmit}>
        <div>
          <label>
            <iconButton className="smile">
              <CollectionsIcon />
            </iconButton>
            <input
              style={{ display: "none" }}
              type="file"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </label>
        </div>

          <input
            type="text"
            placeholder="type a message"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <iconButton className="">
              <Mic/>
            </iconButton>
         <button type="submit" className="mic">
          <SendIcon />
        </button>
        </form>

      </div>
    </div>
  );
};

export default ChatTab;
