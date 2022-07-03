import React, { useState ,useEffect } from "react";
import {BrowserRouter, Routes,Route} from "react-router-dom";
import './App.css';
import api from '../api/contacts';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";
import { v4 as uuid } from 'uuid';//provides unique  id 

// flow of project:
// index.html->index.js->App.js->(header.js,addcontact.js,contactlist.js)->(contactlist->contactcard)

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  // so here we are retieving the data through axios and using async awiat also bcz we want to keep this function async as if it takes time to fetch the data then also the code will proceed
  // here instead of taking data from local storage we are taking it from the server.
  const retrieveContacts = async ()=>{
     const response= await api.get("/contacts");
     console.log("res",response);
     return response.data;
  }
  const [contacts,setContacts]=useState([]);
  //we are using useState props which will dynamically make changes to the contacts list which we are passing in contactList componenent 
  // now we have to pass this list in Contact list component which is done by using props
  //props pass data from parent to child
  const [searchTerm,setSearchTerm]=useState("");
  const [searchResults,setSearchResults]=useState([]);
  //this searchTerm is a state for searched contacts and pass it to contactlist
  const searchHandler = (searchTerm)=>{
       setSearchTerm(searchTerm);
       if(searchTerm!=="")
       {
        const newContactList = contacts.filter((contact)=>{
          // as contact is an object and we want to search on values so object.value will give me values of the contact
          // but they will be separated so to join them and make one string i used join
          return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
               
        });
        setSearchResults(newContactList);
       }
       else{
        setSearchResults(contacts);
       }
  }

  const addContactHandler = async (contact)=>{
    //this ... is spread operator it makes a copy of contacts and then contact is added to it
    console.log(contact);
    const Contact1={id: uuid(), ...contact};
    // we are adding this to our server by POST method
    const response = await api.post("/contacts",Contact1);
    setContacts([...contacts,response.data]);
    console.log("sfs",response.data);
    // window.localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(finalContacts)) 
    // this stores in the local memory in form key value pair of strings
    //localStorage is a property that allows JavaScript sites and apps to save key-value pairs in a web browser with no expiration date. This means the data stored in the browser will persist even after the browser window is closed
  };
 //in newcontactlist i will take only those entries whose id is not equal to the id we want to delete
 //and this id will be taken from contactList and in that from contactCard using function as props
  const removeContactHandler = async (id)=>{
    if(window.confirm("Are you sure you want to delete this contact?"))
    {
      //delete from the server
      await api.delete(`/contacts/${id}`);
      const newContactList = contacts.filter((contact)=>{
        return contact.id!==id;
      })
      setContacts(newContactList);
    }
   
  }
 
  const updateContactHandler= async (contact)=>{
    const response = await api.put(`/contacts/${contact.id}`,contact);
    const {id,name,email}=response.data;
    setContacts(contacts.map(contact =>{
      return contact.id== id? {...response.data} : contact;
    }))
  }

    //Now i need to get the data from the local storage.. we use getItem
    
useEffect(()=>{ 
  const getAllContacts = async ()=>{
    const allContacts = await retrieveContacts();
    if(allContacts) setContacts(allContacts);
  }
  getAllContacts();
  }, []);


  return (
    <div className="ui container">
      <BrowserRouter>
      <Header/>
      <Routes>
      <Route path="/" exact element={<ContactList contacts={searchTerm.length<1?contacts:searchResults} getContactId={removeContactHandler} term={searchTerm} searchKeyword={searchHandler}></ContactList>}>
      </Route>
      {/*  instead of component i will be using render bcz using component it will everytime call the functional component */}
      

      <Route path="/add" element={<AddContact addContactHandler={addContactHandler}></AddContact>}/>
      {/* here you mentioned path as /add so first it will read / and then add therefore on the addcontact page also you will see the contact list */}
      {/* so the solution to this is using route which will as soon as it recognises one page will not move forward in reading url */}
     
      {/* <AddContact addContactHandler={addContactHandler}></AddContact> 
      <ContactList contacts={contacts} getContactId={removeContactHandler}></ContactList>  */}
      {/* here contact is the property name which we can use in ContactList component */}
      <Route path="/contact/:id" element={<ContactDetail></ContactDetail>}></Route>
      <Route path="/edit" element={<EditContact updateContactHandler={updateContactHandler}></EditContact>}></Route>
      </Routes> 
      </BrowserRouter>
      
      
    </div>
  ); 
}

export default App;
