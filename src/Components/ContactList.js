import React, { useRef } from "react";
import ContactCard from "./ContactCard";
import { BrowserRouter,Link } from "react-router-dom" // these brackets are used bcz Link is not default export component
const ContactList = (props)=>{
    //useRef smjh ni aaya dhang se pd le
    const inputEl= useRef("");
    const deleteContactHandler= (id)=>{
        props.getContactId(id);
    };
    // now here we are declaring a function which will be mapped to each object of the prop

    const renderContactList = props.contacts.map((contact)=>{
        return(
            // so basically we dont want to repeat that code so we use contactcard component and passes this object of cont as a prop
            <ContactCard contact={contact} clickHandler={deleteContactHandler} key={contact.id}></ContactCard>
        );
    })
    // i am using this function only bcz of the application of useRef hook otherwise i could have done it also by using e.target.value at that point only
    const getSearchTerm= ()=>{
        props.searchKeyword(inputEl.current.value);
    }
 
    return(
        <div className="main" style={{marginTop:"100px", backgroundColor:"#f3f3f3", height:"max-content", padding:"20px"}}>
            <div style={{display:"flex", justifyContent:"space-between", borderBottom: "1px solid lightgrey"}}>
            <h2 style={{fontSize:"30px"}}>
                Contact list          
            </h2>
            <Link to="/add">
                <button className="ui button blue right">Add Contact</button>
                </Link>
            </div>
            <div className="ui search" style={{marginTop:"15px", marginBottom:"40px"}}>
                 <div className="ui icon input" style={{width:"100%"}}>
                    <input 
                        ref={inputEl}
                        type="text" 
                        placeholder="Search Contacts" 
                        className="prompt" 
                        value={props.term} 
                        onChange={getSearchTerm}>
                    </input>
                    <i className="search icon"></i>
                 </div>
            </div>
            <div className="ui celled list" style={{marginBottom:"40px"}}>
            {renderContactList.length>0?renderContactList:"No contacts available"}
            {/* here i am not  using renderContactList() like this bcz i don't want to execute the func right here i just want to reference it or return it */}
         </div>
        </div>
         
    );
}

export default ContactList;

