import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useUserName, useID, useAdmin } from "../../context/auth";

function Logout(props) {
  const [isLoggedIn, setLoggedIn] = useState(true);
  const { setUserNameTokens } = useUserName();
  const { setIDTokens } = useID();
  const { setAdminTokens } = useAdmin();

  useEffect(() => {
    setUserNameTokens();
    setIDTokens();
    setAdminTokens();
    setLoggedIn(false);
  }, [ setUserNameTokens, setIDTokens, setAdminTokens ]);

  if(!isLoggedIn) {
    return <Redirect to={"/"} />;
  }

  return (
    <div></div>
  );
}

export default Logout;