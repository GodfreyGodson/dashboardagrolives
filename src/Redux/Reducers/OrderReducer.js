import { ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS } from "../Constants/OrderConstants";

// PRODUCT LIST
export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true, orders: [] };
    case ORDER_LIST_SUCCESS:
        return {loading: false, orders: action.payload };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Order ID
export const orderByIdReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true, order: [] };
    case ORDER_LIST_SUCCESS:
        return {loading: false, orders: action.payload };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
