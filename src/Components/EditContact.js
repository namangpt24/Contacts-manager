import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// we can also use a class component in place of functional component
const EditContact=(props)=> {
    const location =useLocation();
    const {id,name,email} = location.state.contact;
    // now here we are building this state for contacts which will get updated on any update in contact form
    //As i am here using class component so i will not be using react hooks 
    //and these value will be updated by using onchange function from the form
    const [newemail,setEmail]=useState(email);
    const [newname,setName]=useState(name);
    const navigate=useNavigate();
    const update =(e)=>{
        //preventdefalut bcz i am using a button and i dont want my page to get refresh
        e.preventDefault();
        if(newname==="" || newemail==="")
        {
            alert("All fields are mandatory!")
            return;
        } 
        //Now this state is getting updated but we want to pass this to app.js so that it can update contacts
        //if the pass is from parent to child we use props but how to do it from child to parent
        //to do this we pass a function a=from app.js and pass this state as an attribute to that function
        props.updateContactHandler({id,name:newname,email:newemail})
        //now to remove name and email from input tag after pressing button
        setEmail("");
        setName("");
        navigate("/"); // used to get back to home page on clicking add button
    };
    
    
  
        return (
             <div className="ui main" style={{marginTop:"95px",marginBottom:"50px",marginLeft:"50px"}}>
                  <h2>Edit Contact</h2>
                  <form className="ui form" onSubmit={update}>
                       <div className="field">
                           <label>Name</label>
                           <input type="text" 
                           name="newname" 
                           placeholder="Name" 
                           //this value here is the default value of this input field
                           value={newname}
                           //so this is the method in class components we are setting up the value of input name in our state using this.setState
                           onChange={(e)=>{
                            setName(e.target.value);
                           }}></input>
                       </div>
                       <div className="field">
                           <label>Email</label>
                           <input type="text"
                            name="newemail"
                            placeholder="Email" 
                            value={newemail}
                            onChange={(e)=>{
                            setEmail(e.target.value);
                           }}></input>
                       </div>
                       <button className="ui button blue">Update</button>
                  </form>
             </div>

              
             
        );
    
}
export default EditContact;
