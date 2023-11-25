import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Billing: React.FC = () => {
    const [selectedAmount, setSelectedAmount] = useState<string>("10.00");

    const createOrder = (amount: string) => {
        try{
          
            return fetch('/api/create-paypal-transaction', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount })
            }).then(function(res) {
                
                return res.json();
            }).then(function(data) {
              
                return data.orderID
                ;
            });


        }
        catch(err){
            console.log(err);
        }

    }

    const onApprove = (data: any): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            try {
                fetch('/api/paypal-transaction-complete', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        orderID: data.orderID
                    })
                })
                .then(function(res) {
                    return res.json();
                })
                .then(function(details) {
                    alert('Transaction funds captured from ' + details.payer_given_name);
                    resolve();
                })
                .catch(err => {
                    console.log(err);
                    reject(err); // Reject the promise if there is an error in the fetch call
                });
            }
            catch(err) {
                console.log(err);
                resolve(); // Resolve the promise even in case of an error to fulfill the type requirement
            }
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
                        createOrder={(data, actions) => createOrder(selectedAmount) as Promise<string>}
                        onApprove={onApprove}
            />
            </div>
            </PayPalScriptProvider>
</div>
        </div>
    );

}
export default Billing;


