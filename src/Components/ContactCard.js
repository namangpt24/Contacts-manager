import React from "react";
import user from "../images/user.jpg";
import {Link} from "react-router-dom";

const ContactCard=(props)=>{
//  so i am gonna use destructuring here so that we dont need to write props.obj.name... again and again
const {id,name,email}=props.contact;

   return(
    <div className="item" style={{display:"flex", height:"50px", alignItems:"center"}}>
    <div style={{display:"flex", width:"400px"}}>
    <img className="ui avatar image" src={user} alt="user" style={{marginRight:"5px", width:"32px", height:"35px",}}></img>
    <div className="content">
        {/* So in this link with the url i need to pass the state also bcz i need to update the name and email acc to the requirement */}
        <Link to={`/contact/${id}`} state={{contact: props.contact}}>
            <div className="header" style={{marginBottom:"1px"}}>{name}</div>
            <div>{email}</div>
        </Link>
    </div>
    </div>
    <div style={{width:"400px", display:"flex" , justifyContent:"right"}}>
    <div>
    <i className="trash alternate outline icon"
    style={{color:"red", cursor:"pointer"}}
    onClick={()=> props.clickHandler(id)}></i>
    </div>
    <div style={{marginLeft:"100px"}}>
    <Link to="/edit" state={{contact: props.contact}}>
        <i className="edit alternate outline icon"
        style={{color:"blue"}}></i>
    </Link>
    </div>
    </div>
</div>

   );
}
export default ContactCard;