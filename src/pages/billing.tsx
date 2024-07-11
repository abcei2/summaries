import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Router } from "next/router";
import MainContainer from "@/components/utils/MainContainer";
import CustomImage from "@/components/utils/CustomImage";

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
    <MainContainer className="relative min-h-[1100px] sm:min-h-screen font-pt-sans text-xs overflow-hidden">
      <div className="flex flex-col items-center gap-16 relative z-[1]">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <CustomImage
              src="/icons/billing-1.svg"
              alt="Billing top icon"
              width={23}
              height={23}
              className="self-center"
            />
            <span className="text-2xl font-bold font-rokkitt">Buy Tokens</span>
          </div>
          <span className="font-bold text-center">
            Select the amount you want to buy
          </span>
        </div>

        <div className="flex flex-col sm:flex-row justify-around gap-6 sm:gap-16">
          {[
            { amount: "10.00", tokens: "100,000" },
            { amount: "40.00", tokens: "500,000" },
            { amount: "80.00", tokens: "1,000,000" },
          ].map(({ amount, tokens }, index) => (
            <div
              key={index}
              onClick={() => selectAmount(amount, tokens)}
              className={`flex w-[176px]
                flex-col items-center p-2.5 gap-1 cursor-pointer rounded-[10px] leading-3 ${
                  selectedAmount === amount
                    ? "border-2 border-secondary"
                    : "border border-custom-black hover:border-secondary"
                }`}
            >
              <CustomImage
                src="/icons/currency_exchange.svg"
                alt="Billing currency exchange icon"
                width={17.25}
                height={17.17}
              />
              <span className="font-bold mt-1">{tokens} Tokens</span>
              <span>for {amount} USD</span>
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
      <CustomImage
        src="/images/billing-bg.svg"
        alt="Billing bg image"
        width={900}
        height={768}
        className="absolute bottom-[220px] -left-[300px] sm:left-[-30px] z-[0]"
      />
    </MainContainer>
  );
}
