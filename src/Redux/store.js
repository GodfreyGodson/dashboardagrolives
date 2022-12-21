import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userByIdReducer, userListReducer, userLoginReducer } from "./Reducers/userReducers";
import { productCreateReducer, productDeleteReducer, productListReducer } from "./Reducers/ProductReducers";
import { categoryCreateReducer, categoryDeleteReducer, categoryEditReducer, categoryListReducer } from "./Reducers/CategoryReducers";
import { sliderCreateReducer, sliderDeleteReducer, sliderListReducer } from "./Reducers/SliderReducer";
import { orderListReducer } from "./Reducers/OrderReducer";


const reducer = combineReducers({

 userLogin: userLoginReducer,
 userList: userListReducer,
 productList: productListReducer,
 productDelete: productDeleteReducer,
 productCreate: productCreateReducer,
 categoryCreate: categoryCreateReducer,
 categoryList: categoryListReducer,
 categoryDelete:  categoryDeleteReducer,
 orderList:orderListReducer,
 userById:userByIdReducer,

 sliderCreate: sliderCreateReducer,
 sliderList: sliderListReducer,
 sliderDelete:  sliderDeleteReducer,
 categoryEdit: categoryEditReducer

  
});



// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;



const initialState = {

  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
