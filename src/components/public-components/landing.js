import React from "react";

function MainLanding(props) {
  return (
    <div className="text-center">
      <h2>Welcome to Barnwood!</h2>
        <p style={{marginTop: "30px"}}>
          This is a React application for creating, reading, updating, and deleting products and orders.
          A user registration system also exists, as well as a messaging system for each product.
          Please note this application is for testing purposes only, and no orders can actually be purchased.
          The Paypal ordering only exists in a sandbox environment. Thanks for visiting!
        </p>
    </div>
  )
}

export default MainLanding;