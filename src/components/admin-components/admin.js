import React from "react";

/* Begin Import Components */
import AdminRoute from '../../routes/adminRoute';

import ProductListAdmin from "./productListAdmin";
import ProductCreate from "./productCreate";
import ProductDelete from "./productDelete";
import ProductEdit from "./productEdit";
import UserList from "./userList";
import UserDelete from "./userDelete";
/* End Import Components */

function Admin(props) {

  return (
    <div className="container">
        {/* Begin Routes */}
            <AdminRoute path="/products/" exact component={ProductListAdmin} />
            <AdminRoute path="/products/new" exact component={ProductCreate} />
            <AdminRoute path="/products/:id/delete" exact component={ProductDelete} />
            <AdminRoute path="/products/:id/edit" exact component={ProductEdit} />
            <AdminRoute path="/users/" exact component={UserList} />
            <AdminRoute path="/users/:id/delete" exact component={UserDelete} />
        {/* End Routes */}
    </div>
  );
}

export default Admin;