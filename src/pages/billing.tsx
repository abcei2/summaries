import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


export default function Billing() {

const [selectedAmount, setSelectedAmount] = useState<string>("10.00");

function createOrder(selectedAmount: string, data: any, actions: any) {
    return fetch("/api/create-paypal-transaction", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ selectedAmount})
            
        })
            .then((response) => response.json())
            //.then((order) => order.id);
            .then((data) => data.orderID)
            .catch(err => {
                console.error("Error in createOrder: ", err);
                
            });
    }
    function onApprove(data: any) {
          return fetch("/api/paypal-transaction-complete", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderID: data.orderID
            })
          })
          .then((response) => response.json())
          .then((orderData) => {
                const name = orderData.payer.name.given_name;
                alert(`Transaction completed by ${name}`);})
            .catch(err => {
                console.error("Error in onApprove: ", err);
            });

        }
        const selectAmount = (amount: string) => {
            setSelectedAmount(amount);
        }
    
        return (
            <div>
              
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                
                <h3>Buy Tokens. Click on the amount you want to buy</h3>
                </div>
    
    
                <div style={{ display: 'flex', justifyContent: 'space-around', margin: '80px 0' }}>
                    {[
                      { amount: "10.00", tokens: "100,000" }, 
                      { amount: "40.00", tokens: "500,000" },
                      { amount: "80.00", tokens: "1,000,000" }
                    ].map(({ amount, tokens }) => (
                        <div key={amount} 
                             onClick={() => selectAmount(amount)} 
                             style={{ padding: '10px', border: selectedAmount === amount ? '2px solid blue' : '1px solid grey', cursor: 'pointer' }}>
                            Buy {tokens} Tokens for {amount} USD
                        </div>
                    ))}
                </div>
                <div style={{ justifyContent: 'center', display: 'flex' }}>
                <PayPalScriptProvider options={{ "clientId": "Ac1oTxr7mKqjrstIK0CfSSrm1thx9hsHCKblUilxmjjp-TtsOfbHiXWA5icJT-CZabLI9P6e2jlNDonB" }}>
                    <div style={{ width: '100%', maxWidth: '500px' }}> {/* Adjust the maxWidth as needed */}
                        <PayPalButtons
                            //style={{ layout: 'horizontal' }} // This can help in some cases
                            createOrder={(data, actions) => createOrder(selectedAmount, data, actions)}
                            onApprove={onApprove}
                />
                </div>
                </PayPalScriptProvider>
    </div>
            </div>
        );
}