import axios from "axios";

export default async function register(credentials) {
    
    const {username,password} = credentials;

    try{

        const response = await axios.post(`${import.meta.env.VITE_URL_REQUESTS}/api/users/register`, {
            username,password
        });

        console.log(response.data.message);
        return {authentification:true};

    } catch(err){

        console.log(err.response.data.message);
        return {authentification:false, errorMessage:err.response.data.message};
    }
}