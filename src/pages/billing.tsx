import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Router } from "next/router";

export default function Billing() {
  const [selectedAmount, setSelectedAmount] = useState<string>("10.00");
  const [selectedTokens, setSelectedTokens] = useState<string>("100,000");

  function createOrder(
    selectedAmount_arg: string,
    selectedTokens_arg: string,
    data: any,
    actions: any
  ) {
    return (
      fetch("/api/create-paypal-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedAmount, selectedTokens }),
      })
        .then((response) => response.json())
        //.then((order) => order.id);
        .then((data) => data.orderID)
        .catch((err) => {
          console.error("Error in createOrder: ", err);
        })
    );
  }
  function onApprove(data: any) {
    return fetch("/api/paypal-transaction-complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    })
      .then((response) => response.json())
      .then((orderData) => {
        console.log(orderData);
        const first_name = orderData.first_name;
        //window.location.reload();

        //window.location.reload();
        //window.alert("Thank you for your purchase.");
        //wait for reload and then alert
        window.location.reload();
      })

      .catch((err) => {
        console.error("Error in onApprove: ", err);
      });
  }

  const selectAmount = (amount: string, tokens: string) => {
    setSelectedAmount(amount);
    setSelectedTokens(tokens);
  };

  const initialOptions = {
    clientId:
      "AQKRqebXT8kjewSTwUaTGt3pMjptoFVMuPVZTiRPL6fgT0_-MqJGamaN6_zw-FJHKgxlDvkbjJ5uaqwl",
    currency: "USD",
    intent: "capture",
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3>Buy Tokens. Click on the amount you want to buy</h3>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "80px 0",
        }}
      >
        {[
          { amount: "10.00", tokens: "100,000" },
          { amount: "40.00", tokens: "500,000" },
          { amount: "80.00", tokens: "1,000,000" },
        ].map(({ amount, tokens }) => (
          <div
            key={amount}
            onClick={() => selectAmount(amount, tokens)}
            style={{
              padding: "10px",
              border:
                selectedAmount === amount ? "2px solid blue" : "1px solid grey",
              cursor: "pointer",
            }}
          >
            Buy {tokens} Tokens for {amount} USD
          </div>
        ))}
      </div>
      <div style={{ justifyContent: "center", display: "flex" }}>
        <PayPalScriptProvider options={initialOptions}>
          <div style={{ width: "100%", maxWidth: "500px" }}>
            {" "}
            {/* Adjust the maxWidth as needed */}
            <PayPalButtons
              key={`${selectedAmount}-${selectedTokens}`}
              //style={{ layout: 'horizontal' }} // This can help in some cases
              createOrder={(data, actions) =>
                createOrder(selectedAmount, selectedTokens, data, actions)
              }
              onApprove={onApprove}
            />
          </div>
        </PayPalScriptProvider>
      </div>
    </div>
  );
}
