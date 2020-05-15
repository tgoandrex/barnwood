import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
import axios from "axios";

function PayPalBtn(props) {
  const productInfo = props.productInfo;
  const userID = props.id;
  const username = props.username;
  let orderID = "";

    return (
        <PayPalButton
          createOrder={(data, actions) => {
            axios.post("http://localhost:4000/orders/new",
                {productInfo, userID, username}
            ).then((res) => {
                if(res.status === 200) {
                    orderID = res.data._id;
                    console.log("orderID in createOrder: ", orderID)
                }
            }).catch((err) => {
                console.log(err);
            });
            return actions.order.create({
              purchase_units: [{
                amount: {
                  currency_code: "USD",
                  value: props.amount
                }
              }]
            })
          }}

          onSuccess={(details, data) => {
            alert("Transaction completed by " + details.payer.name.given_name);
            console.log("orderID in onSuccess: ", orderID);

            return axios.post("http://localhost:4000/orders/success",
              {data, productInfo, orderID}
            ).then((res) => {
                if(res.status === 200) {
                  console.log(res.data);
                }
            }).catch((err) => {
              console.log(err);
            });
          }}

          onCancel={(data) => {
            alert("Transaction cancelled");
            console.log("orderID in onCancel: ", orderID);

            return axios.post("http://localhost:4000/orders/cancel",
              {orderID}
            ).then((res) => {
                if(res.status === 200) {
                  console.log(res.data);
                }
            }).catch((err) => {
              console.log(err);
            });
          }}

          onError={(err) => {
            alert(err);
          }}

          options={{clientId: ""}} // Left blank for Github
        />
      );
}

export default PayPalBtn;