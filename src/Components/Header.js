import React from "react";

const Header=()=>{
    return (
        <div className="ui fixed menu" style={{marginBottom:"20px"}}>
            <div className="ui container center" style={{alignItems:"center", margin:"auto",padding:"10px"}}>
                <h2 style={{fontSize:"40px",fontStyle:"bold"}}>Contact Manager</h2>
            </div>
        </div>
    );
}

export default Header;