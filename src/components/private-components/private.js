import React from "react";

/* Begin Import Components */
import PrivateRoute from '../../routes/privateRoute';

import MessageCreate from "./messageCreate";
import MessageEdit from "./messageEdit";
import MessageDelete from "./messageDelete";
/* End Import Components */

function Private(props) {

  return (
    <div className="container">
        {/* Begin Routes */}
            <PrivateRoute path="/products/list/:product_id/messages/new" exact component={MessageCreate} />
            <PrivateRoute path="/products/list/:product_id/messages/:message_id/edit" exact component={MessageEdit} />
            <PrivateRoute path="/products/list/:product_id/messages/:message_id/delete" exact component={MessageDelete} />
        {/* End Routes */}
    </div>
  );
}

export default Private;