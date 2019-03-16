import React, { useState, useEffect } from "react";
import axios from 'axios';
var braintree = require('braintree-web');
var paypal = require('paypal-checkout');

const Payments = (props) => {
    const [clientId, setClientId] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/payment/generateToken`)
            .then((response) => {
                setClientId(response.data.clientToken);
                console.log("clientToken", response.data.clientToken)
            }).catch((err) => console.log(err.response))
    }, []);

    useEffect(() => {
        if (clientId) {

            
            paypal.Button.render({
                braintree: braintree,
                client: {
                    sandbox: clientId
                },
                env: 'sandbox', // Or 'sandbox'
                commit: true, // This will add the transaction amount to the PayPal button

                payment: (data, actions) => {
                    const userName = `${props.userDetails.fname} ${props.userDetails.lname}`;
                    return actions.braintree.create({
                        flow: 'checkout', // Required
                        amount: 100, // Required
                        currency: 'USD', // Required
                        enableShippingAddress: true,
                        shippingAddressEditable: false,
                        shippingAddressOverride: {
                            recipientName: userName,
                            line1: '1234 Main St.',
                            line2: 'Unit 1',
                            city: 'Chicago',
                            countryCode: 'US',
                            postalCode: '60652',
                            state: 'IL',
                            phone: '123.456.7890'
                        }
                    });
                },

                onAuthorize: function (payload) {
                    // Submit `payload.nonce` to your server.
                    console.log(payload)
                    axios.post(`http://localhost:5000/payment/checkout`, payload)
                        .then((response) => {
                            console.log("Success checkout", response)
                        }).catch((err) => console.log(err.response))
                },
            }, '#paypal-button');

        }
    },[clientId])



    return (
        <div style={{ "display": props.display }}>
            <div id="paypal-button"></div>
        </div>
    )

}



export default Payments;


