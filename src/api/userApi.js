const server = "https://feedback-backend-beta.vercel.app/api";
import axios from "axios";

export const loginUserApi = async (email, password)=> {
    try{
        const response = await axios.post(
        `${server}/user/login`,
        { email, password },
        {
            headers: {
            "Content-type": "application/json",
            },
            // withCredentials: true,
        }
        );
        localStorage.setItem("token", response.data.token);
        return response;
    }catch(error){
        return error;
    }
}

export const loadUserApi = async () =>{
    try{
        const token = localStorage.getItem("token");
        const response = await axios.get(
        `${server}/user/profile`,
        {
            headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
            },
        }
        );
        console.log(response);
        return response;
    }catch(error){
        return error;
    }
}

export const registerUserApi = async (formdata)=> {
    try{
        const response = await axios.post(`${server}/user/register`, formdata, {
            headers: {
              "Content-type": "application/json",
            },
          });
      
          localStorage.setItem("token", response?.data?.token);
        return response;
    }catch(error){
        return error;
    }
}

export const logoutUserApi = async ()=> {
    try{
        const response = await axios.post(`${server}/user/logout`, {});
        localStorage.removeItem("token");
        return response;
    }catch(error){
        return error;
    }
}
