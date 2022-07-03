import React from "react";
import user from "../images/user.jpg";
import {Link, useLocation} from "react-router-dom";

const ContactDetail=()=>{
   const location = useLocation(); // Basically useLocation returns the state of the current url location
   const {name,email}= location.state.contact; //this state.contact was the state of the url
   return(
    <div className="main" style={{marginTop:"100px", alignItems:"center"}}>
        <div className="ui card centered">
            <div className="image">
                <img src={user} alt="user"></img>
            </div>
            <div className="content" style={{textAlign:"center"}}>
                <div className="header">{name}</div>
                <div className="description">{email}</div>
            </div>
        </div>
        <div className="center-div" style={{width:"100%", display:"flex", justifyContent:"center", marginTop:"30px"}}>
            <Link to="/">
            <button className="ui button blue center">Back to Contact List</button>
            </Link>
            
        </div>
    </div>
   );
};
export default ContactDetail;