import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useID } from "../context/auth";

function PrivateRoute({ component: Component, ...rest }) {
  const { IDTokens } = useID();

  return (
    <Route
      {...rest}
      render={props =>
        IDTokens ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { referer: props.location } }} />
        )
      }
    />
  );
}

export default PrivateRoute;