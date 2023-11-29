import { addProductApi, commentOnProductApi, deleteProductByIdApi, editProductApi, getAllProductApi, getFilterDataApi, getProductByIdApi, likeOnProductApi, searchProductApi } from "../../api/productApi";
import { server } from "../store";
import axios from "axios";

export const getAllProduct =
  (filter, sortMethod) => async (dispatch) => {
    try {
      dispatch({ type: "getAllProductRequest" });

      const {data} = await getAllProductApi(filter, sortMethod);

      dispatch({ type: "getAllProductSuccess", payload: data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "getAllProductFail",
        payload: error?.response?.data?.message,
      });
    }
  };


  export const addProduct = (formdata) => async (dispatch) => {
    try {
      dispatch({ type: "addProductRequest" });
        
        const {data} = await addProductApi(formdata);
  
      dispatch({ type: "addProductSuccess", payload: data.message });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "addProductFail",
        payload: error.response.data.message,
      });
    }
  }


export const commentOnProduct = (id, comment) => async (dispatch) => {
    try {
        dispatch({ type: "commentOnProductRequest" });
    
       const {data} = await commentOnProductApi(id, comment);
    
        dispatch({ type: "commentOnProductSuccess", payload: data.message });
    } catch (error) {
        console.log(error);
        dispatch({
        type: "commentOnProductFail",
        payload: error.response.data.message,
        });
    }
};

export const likeOnProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: "likeOnProductRequest" });

        const {data} = await likeOnProductApi(id);
       
        dispatch({ type: "likeOnProductSuccess", payload: data.message });
    } catch (error) {
        console.log(error);
        dispatch({
        type: "likeOnProductFail",
        payload: error?.response?.data?.message,
        });
    }
}


export const getFilterData = () => async (dispatch) => {
    try {
        dispatch({ type: "getFilterDataRequest" });
    
        const {data} = getFilterDataApi();
        
        dispatch({ type: "getFilterDataSuccess", payload: data.result });
    } catch (error) {
        console.log(error);
        dispatch({
        type: "getFilterDataFail",
        payload: error.response.data.message,
        });
    }
}

export const EditProduct = (id, formdata) => async (dispatch) => {
    try {
        dispatch({ type: "EditProductRequest" });
       const {data} = await editProductApi(id, formdata);
    
        dispatch({ type: "EditProductSuccess", payload: data.message });
    } catch (error) {
        console.log(error);
        dispatch({
        type: "EditProductFail",
        payload: error.response.data.message,
        });
    }
}


export const getProductById = (id) => async (dispatch) => {
  try {
    dispatch({ type: "productRequest" });

    const {data} = await getProductByIdApi(id);

    dispatch({ type: "productSuccess", payload: data.product });
  } catch (error) {
    dispatch({
      type: "productFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteProductById = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteProductRequest" });
    const {data} = await deleteProductByIdApi(id);

    dispatch({ type: "deleteProductSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "deleteProductFail",
      payload: error?.response?.data?.message,
    });
  }
}


export const searchProduct = (keyword) => async (dispatch) => {
  try {
    dispatch({ type: "SearchRequest" });

    const {data} = await searchProductApi(keyword);
    dispatch({ type: "SearchSuccess", payload: data.products });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "SearchFail",
      payload: error.response.data.message,
    });
  }
};
