import React from "react";
import { Route } from "react-router-dom";

/* Begin Import Components */
import Landing from "./landing";
import Register from "./register"
import Login from "./login";
import ProductListPublic from "./productListPublic";
import ProductDetails from "./productDetails";
import UserDetails from "./userDetails";
/* End Import Components */

function App(props) {

  return (
    <div className="container">
        {/* Begin Routes */}
            <Route path="/" exact component={Landing} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/products/list" exact component={ProductListPublic} />
            <Route path="/products/list/:id" exact component={ProductDetails} />
            <Route path="/users/:id" exact component={UserDetails} />
        {/* End Routes */}
    </div>
  );
}

export default App;