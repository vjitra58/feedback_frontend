const server = "https://feedback-backend-beta.vercel.app/api";
import axios from "axios";

export const getAllProductApi = async (filter, sortMethod) => {
    try{
        const response = await axios.get(
            `${server}/product/getall?filter=${filter}&sort=${sortMethod}`,
            {
              headers: {
                "Content-type": "application/json",
              },
            }
          );

        return response;
    }catch(error){
        return error;
    }
}

export const addProductApi = async (formdata) => {
    try{
        const token = localStorage.getItem("token");

        const response = await axios.post(`${server}/product/add`, formdata, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          // withCredentials: true,
        });

        return response;
    }catch(error){
        return error;
    }
}

export const commentOnProductApi = async (id, comment) => {
    try{
        const response = await axios.put(
            `${server}/product/comment/${id}`,
            { comment },
            {
                headers: {
                "Content-type": "application/json",
                },
            }
            );

        return response;
    }catch(error){
        return error;
    }
}

export const likeOnProductApi = async (id) => {
    try{
        const { data } = await axios.put(
        `${server}/product/like/${id}`,
        {},
        {
            headers: {
            "Content-type": "application/json",
            },
        }
        );
        return response;
    }catch(error){
        return error;
    }
}

export const editProductApi = async (id, formdata) => {
    try{
        const token = localStorage.getItem("token");
        const response = await axios.put(
          `${server}/product/edit/${id}`,
          formdata,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            // withCredentials: true,
          }
        );

        return response;
    }catch(error){
        return error;
    }
}

export const getProductByIdApi = async (id) => {
    try{
        const response = await axios.get(`${server}/product/${id}`, {
            headers: {
              "Content-type": "application/json",
            },
            
          });

        return response;
    }catch(error){
        return error;
    }
}

export const deleteProductByIdApi = async (id) => {
    try{
        const token = localStorage.getItem("token");
        const response= await axios.delete(`${server}/product/delete/${id}`, {
            headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
            },
           
        });

        return response;
    }catch(error){
        return error;
    }
}

export const searchProductApi = async (keyword) => {
    try{
        const response = await axios.get(
        `${server}/product/allproducts?keyword=${keyword}`,
        {
            headers: {
            "Content-type": "application/json",
            },
        }
        );
        return response;
    }catch(error){
        return error;
    }
}

export const getFilterDataApi = async () => {
    try{
        const response = await axios.get(`${server}/product/filterdata`, {
        headers: {
            "Content-type": "application/json",
        },
        
        });
        return response;
    }catch(error){
        return error;
    }
}