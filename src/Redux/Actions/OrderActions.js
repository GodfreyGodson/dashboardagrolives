import { ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS } from "../Constants/OrderConstants";
import { logout } from "./userActions";
import axios from "axios";

//GET LIST OF Orders
export const listOrders = () => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_LIST_REQUEST });
      const {
       userLogin: { userInfo },
     } =  getState();
  
 console.log(userInfo)
  if(userInfo.data.token){
   const config = {
     headers: {
       Authorization: `Bearer ${userInfo.data.token}`,
     },
   };
 
   const { data } = await axios.get(`http://backend.dirmagrolives.co.tz/api/order`, config);
   console.log(data);
    
   dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
 
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
      type: ORDER_LIST_FAIL,
      payload: message,
    });
    }
  };
 
