import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Billing: React.FC = () => {
    const [selectedAmount, setSelectedAmount] = useState<string>("10.00");

function createOrder (amount: string) => {
        return fetch('/api/create-paypal-transaction', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount })
        })
        .then((response) => response.json())
        .then((data) => data.orderID)
        .catch(err => {
            console.error("Error in createOrder: ", err);
            // Handle the error according to your application's requirement, e.g., show a message to the user
        });
    };
    

    function onApprove (data: any): Promise<void> => {
        return fetch('/api/paypal-transaction-complete', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orderID: data.orderID
            })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(details => {
            alert('Transaction funds captured from ' + details.payer_given_name);
        })
        .catch(err => {
            console.error("Error in onApprove: ", err);
            // Handle the error here, such as showing an error message to the user
        });
    };
    

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
                        createOrder={createOrder(selectedAmount)}
                        onApprove={onApprove}
            />
            </div>
            </PayPalScriptProvider>
</div>
        </div>
    );

}
export default Billing;


