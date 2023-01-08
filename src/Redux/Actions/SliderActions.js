import axios from "axios";
import { SLIDER_CREATE_FAIL, SLIDER_CREATE_REQUEST, SLIDER_CREATE_SUCCESS, SLIDER_DELETE_FAIL, SLIDER_DELETE_REQUEST, SLIDER_DELETE_SUCCESS, SLIDER_LIST_FAIL, SLIDER_LIST_REQUEST, SLIDER_LIST_SUCCESS } from "../Constants/SliderConstants";

import { logout } from "./userActions";


//CREATE SLIDER
export const createSlider = (sliderName, sliderDescription,  sliderImage) => async (dispatch, getState) => {
    try {
      dispatch({ type: SLIDER_CREATE_REQUEST });
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
   formData.append('sliderName', sliderName);
   formData.append('sliderDescription', sliderDescription);
   formData.append('sliderImage', sliderImage);
 
 const {data} =  await axios.post(`http://backend.dirmagrolives.co.tz/api/slider/`,  formData, config);
    
   dispatch({ type: SLIDER_CREATE_SUCCESS, payload:data });
 
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
      type: SLIDER_CREATE_FAIL,
      payload: message,
    });
    }
  };
 


  //GET LIST OF SLIDERS
export const listSliders = () => async (dispatch, getState) => {
    try {
      dispatch({ type: SLIDER_LIST_REQUEST });
      const {
       userLogin: { userInfo },
     } =  getState();
  
 
  if(userInfo.data.token){
   const config = {
     headers: {
       Authorization: `Bearer ${userInfo.data.token}`,
     },
   };

   
 
   const { data } = await axios.get(`/api/sliders`, config);
    
   dispatch({ type: SLIDER_LIST_SUCCESS, payload: data.data });
 
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
      type:SLIDER_LIST_FAIL,
      payload: message,
    });
    }
  };



  //DELETE CATEGORY
export const deleteSlider = (sliderId) => async (dispatch, getState) => {
    try {
      dispatch({ type: SLIDER_DELETE_REQUEST });
      const {
       userLogin: { userInfo },
     } =  getState();
  
 
  if(userInfo.data.token){
   const config = {
     headers: {
       Authorization: `Bearer ${userInfo.data.token}`,
     },
   };
 
   await axios.delete(`/api/slider/${sliderId}`, config);
    
   dispatch({ type: SLIDER_DELETE_SUCCESS });
 
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
      type:  SLIDER_DELETE_FAIL,
      payload: message,
    });
    }
  };
 

  /*


  // EDIT PRODUCT
export const editCategory = (categoryId) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_EDIT_REQUEST });
    const { data } = await axios.get(`/api/category/${categoryId}`);
    dispatch({ type: CATEGORY_EDIT_SUCCESS, payload: data });
  }catch (error) {
    const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  if (message === "Not authorized, token failed") {
    dispatch(logout());
  }
  dispatch({
    type: CATEGORY_EDIT_FAIL,
    payload: message,
  });
  }
};
 */
