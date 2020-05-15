import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useID, useAdmin } from "../context/auth";

function AdminRoute({ component: Component, ...rest }) {
  const { IDTokens } = useID();
  const { adminTokens } = useAdmin();

  return (
    <Route
      {...rest}
      render={props =>
        IDTokens && adminTokens ? (
          <Component {...props} />
        ) : IDTokens ? (
          <Redirect to={{ pathname: "/" }} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { referer: props.location } }} />
        )
      }
    />
  );
}

export default AdminRoute;