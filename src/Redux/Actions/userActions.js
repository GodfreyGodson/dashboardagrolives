import {
  USER_BYID_FAIL,
  USER_BYID_REQUEST,
  USER_BYID_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../Constants/UserContants";
import axios from "axios";

// LOGIN
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/login`,
      { email, password },
      config
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};




//GET LIST OF USERS
export const listUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });
    const {
     userLogin: { userInfo },
   } =  getState();


if(userInfo.data.token){
 const config = {
   headers: {
     Authorization: `Bearer ${userInfo.data.token}`,
   },
 };

 const { data } = await axios.get(`/api/users`, config);
  
 dispatch({ type: USER_LIST_SUCCESS, payload: data.data });

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
    type: USER_LIST_FAIL,
    payload: message,
  });
  }
};


//GET LIST OF USERS
export const getUserById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_BYID_REQUEST });
    const {
     userLogin: { userInfo },
   } =  getState();


if(userInfo.data.token){
 const config = {
   headers: {
     Authorization: `Bearer ${userInfo.data.token}`,
   },
 };

 const { data } = await axios.get(`/api/user/${id}`, config);
  
 dispatch({ type: USER_BYID_SUCCESS, payload: data.data });

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
    type: USER_BYID_FAIL,
    payload: message,
  });
  }
};


// LOGOUT
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });

 
};



