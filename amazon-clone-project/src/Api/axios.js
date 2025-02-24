import axios from 'axios'

const axiosInstance = axios.create({
  
  // local instance of firebase functions
 // baseURL: "http://127.0.0.1:5001/clone-e0507/us-central1/api",

  //deployed version of amazon server on render
  baseURL: "https://amazon-api-deploy-10gh.onrender.com",
});

export {axiosInstance}
