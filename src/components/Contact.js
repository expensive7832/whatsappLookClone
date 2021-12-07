import { collection, doc, getDoc, onSnapshot, updateDoc } from "@firebase/firestore";
import EmailIcon from '@mui/icons-material/Email';
import { Avatar, IconButton } from "@mui/material"
import { useEffect, useState } from "react"
import Moment from "react-moment";
import db from "../firebase";
import { useStateValue } from "../Redux/Stateprovider";
import "./contact.css"

const Contact = ({emoji, name, lastMessage, id}) => {

    const [{user}, dispatch] = useStateValue();

    const [lm, setLm] = useState("") // Lm - lastMessage hook

    const read = async(id) =>{
        await updateDoc(doc(db, "lastMsg", id ),{
            unread: false
        })
    }


useEffect(() => {
    const getData = async() =>(
        await onSnapshot(doc(db, "lastMsg", id), (snapshot) =>(
            setLm(snapshot.data())
        ))
    )
    getData()
    return () => {
        getData()
    }
}, [])
    return (
        <div className="contact" key={id} onClick={() => read(id)}>
            <Avatar className="chatImage" src={emoji}/>
            <div style={{marginLeft: "3rem"}}>
                <h3>{name}</h3>
                <div style={{display: `${user?.displayName === lm?.name ? "none" : "block"  }`}}>
                <small>{ lm?.message?.length > 10 ? `${ lm?.message?.substr(0, 10) }...` : lm?.message || lm?.imgUrl && "New Image" }</small>
            </div>
            </div>
            <div>
                
            </div>
            <div style={{display: `${user?.displayName === lm?.name ? "none" : "block"  }`}}>
            <i className="popAlert">{lm?.unread &&
             <IconButton>
                 <EmailIcon/>
             </IconButton>}
             </i>
             {lm?.time &&
            <Moment style={{ fontSize: ".8rem", alignSelf: "flex-end",  color: "green"}} fromNow>{lm?.time?.toDate()}</Moment>
        }
            </div>
        </div>
    )
}

export default Contact
