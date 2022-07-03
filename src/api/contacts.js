import axios from 'axios';
import App from '../Components/App';
//axios is a js library used for making HTTP requests from node.js orXMLHttpRequests from the browser and it supports the Promise API that is native to JS ES6 
// One of the fundamental tasks of any web application is to communicate with servers through the HTTP protocol. This can be easily achieved using Fetch or Axios
// axios.create is creating a client or you can a custom client for the server
// const axios = require('axios') this will give me the default client
// but if i want to use custom one then axios.create will be used
// It is more advantageous to use Axios with Axios.create because it creates a new instance of Axios with a custom config
export default axios.create({
    // With Axios.create, we can set up a config like baseUrl, and all of the calls made will simply require the URI for the HTTP calls, without the full URL.
    // thats why we have used /contacts there in App.js api.get
    baseURL:"http://localhost:3006"
})