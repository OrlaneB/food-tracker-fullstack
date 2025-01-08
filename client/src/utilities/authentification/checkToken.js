import axios from "axios";

export default async function checkToken(){
    const token = localStorage.getItem("token");

    if(token){
        try{
  
          const response = await axios.post(`${import.meta.env.VITE_URL_REQUESTS}/api/users/token`,{
            token
          });
  
          if(response.statusText==="OK") {
            console.log(response.data.message);
            return response.data.profileInfo;
          } else {
            console.log("Token is uncorrect")
            return null;
          }
  
        }
        catch(err){
          console.log(err);
          return null;
        }
      } else {
        console.log("There's no token");
        return null;
      }
}