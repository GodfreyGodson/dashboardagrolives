import axios from "axios";
import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../Constants/ProductConstants";
import { logout } from "./userActions";



//GET LIST OF PRODUCTS
export const listProducts = () => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const {
       userLogin: { userInfo },
     } =  getState();
  
 
  if(userInfo.data.token){
   const config = {
     headers: {
       Authorization: `Bearer ${userInfo.data.token}`,
     },
   };
 
   const { data } = await axios.get(`/api/products`, config);
    
   dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.data });
 
  }
    
      
    } catch (error) {
      const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: message,
    });
    }
  };
 
 

//DELETE PRODUCT
export const deleteProduct = (productId) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_DELETE_REQUEST });
      const {
       userLogin: { userInfo },
     } =  getState();
  
 
  if(userInfo.data.token){
   const config = {
     headers: {
       Authorization: `Bearer ${userInfo.data.token}`,
     },
   };
 
   await axios.delete(`/api/product/${productId}`, config);
    
   dispatch({ type: PRODUCT_DELETE_SUCCESS });
 
  }
    
      
    } catch (error) {
      const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: message,
    });
    }
  };
 






  //CREATE PRODUCTS
export const createProduct = (productName, category,  productShortDescription, productDescription, productPrice, productSalePrice, productImage, productSKU, stockStatus) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    const {
     userLogin: { userInfo },
   } =  getState();


if(userInfo.data.token){
 const config = {
   headers: {
     Authorization: `Bearer ${userInfo.data.token}`,
   },
 };

 
 const formData = new FormData();
 formData.append('productName', productName);
 formData.append('category', category);
 formData.append('productShortDescription', productShortDescription);
 formData.append('productDescription', productDescription);
 formData.append('productPrice', productPrice);
 formData.append('productSalePrice', productSalePrice);
 formData.append('productImage', productImage);
 formData.append('productSKU', productSKU);
 formData.append('stockStatus', stockStatus);

const {data} =  await axios.post(`/api/product/`, formData, config);
  
 dispatch({ type: PRODUCT_CREATE_SUCCESS, payload:data });

}
  
    
  } catch (error) {
    const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  if (message === "Not authorized, token failed") {
    dispatch(logout());
  }
  dispatch({
    type: PRODUCT_CREATE_FAIL,
    payload: message,
  });
  }
};
 