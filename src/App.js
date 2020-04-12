import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserNameContext, IDContext, AdminContext } from "./context/auth";
import "bootstrap/dist/css/bootstrap.min.css";

/* Begin Import Components */
import NavigationBar from "./components/navbar";
import Public from "./components/public-components/public";
import Private from "./components/private-components/private";
import Admin from "./components/admin-components/admin";
/* End Import Components */

function App(props) {
  const [userNameTokens, setUserNameTokens] = useState();
  const [IDTokens, setIDTokens] = useState();
  const [adminTokens, setAdminTokens] = useState();
  
  const setUserName = (data) => {
    sessionStorage.setItem("username", JSON.stringify(data));
    setUserNameTokens(data);
  }

  const setID = (data) => {
    sessionStorage.setItem("ID", JSON.stringify(data));
    setIDTokens(data);
  }

  const setAdmin = (data) => {
    sessionStorage.setItem("admin", JSON.stringify(data));
    setAdminTokens(data);
  }

  return (
    <UserNameContext.Provider value={{ userNameTokens, setUserNameTokens: setUserName}}>
      <IDContext.Provider value={{ IDTokens, setIDTokens: setID}}>
        <AdminContext.Provider value={{ adminTokens, setAdminTokens: setAdmin}}>
          <Router>
            <NavigationBar />
            <div className="container">
              <Public />
              <Private />
              <Admin />
            </div>
          </Router>
        </AdminContext.Provider>
      </IDContext.Provider>
    </UserNameContext.Provider>
  );
}

export default App;