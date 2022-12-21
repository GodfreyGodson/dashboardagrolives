import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function PrivateRouter({ component: Component, ...rest }) {
  const userLogin = useSelector((state) => state.userLogin)
  const userInfo = userLogin
  return (
    <Route
      {...rest}
      component={(props) => {
        const token = window.localStorage.getItem("userInfo");
        if (userInfo && token) {
          return <Component {...props} />;
        } else {
          return <Redirect to={"/login"} />;
        }
      }}
    />
  );
}

export default PrivateRouter;
