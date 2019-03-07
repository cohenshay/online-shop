import React, { useState } from "react";
import axios from 'axios';

function Payments() {


    var braintree = require('braintree-web');
    var paypal = require('paypal-checkout');
    // var client = require('braintree-web/client');
    // var paypalCheckout = require('braintree-web/paypal-checkout');

    paypal.Button.render({
        braintree: braintree,
        client: {
            sandbox: "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJlMTg4NjcyNzUzMTAzZTY2MTI4NDFmMzI4NTYzZGMzMTI5ODViYmFiN2MwZjk4OWFlZmM0Y2M2NThhOWQ3Y2RlfGNsaWVudF9pZD1jbGllbnRfaWQkc2FuZGJveCQ0ZHByYmZjNnBoNTk1Y2NqXHUwMDI2Y3JlYXRlZF9hdD0yMDE5LTAzLTA2VDE3OjQ5OjMyLjgzOTY5MTA2NyswMDAwXHUwMDI2bWVyY2hhbnRfaWQ9ZHlrNTJwZnk1djJzZ3YyNCIsImNvbmZpZ1VybCI6Imh0dHBzOi8vYXBpLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb206NDQzL21lcmNoYW50cy9keWs1MnBmeTV2MnNndjI0L2NsaWVudF9hcGkvdjEvY29uZmlndXJhdGlvbiIsImdyYXBoUUwiOnsidXJsIjoiaHR0cHM6Ly9wYXltZW50cy5zYW5kYm94LmJyYWludHJlZS1hcGkuY29tL2dyYXBocWwiLCJkYXRlIjoiMjAxOC0wNS0wOCJ9LCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL2R5azUycGZ5NXYyc2d2MjQvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vb3JpZ2luLWFuYWx5dGljcy1zYW5kLnNhbmRib3guYnJhaW50cmVlLWFwaS5jb20vZHlrNTJwZnk1djJzZ3YyNCJ9LCJ0aHJlZURTZWN1cmVFbmFibGVkIjpmYWxzZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoidGVzdCBmYWNpbGl0YXRvcidzIFRlc3QgU3RvcmUiLCJjbGllbnRJZCI6IkFicFFRaFNrbWUycEhkaDhtUXNqcU9MQ1hYNVQwNVcyakt2RGIyek84OXJDZXhvcFJ5N1p4bXpiUFE4SWcxNmg3UERpZXNDWlF4eHEtWE9DIiwicHJpdmFjeVVybCI6Imh0dHBzOi8vZXhhbXBsZS5jb20iLCJ1c2VyQWdyZWVtZW50VXJsIjoiaHR0cHM6Ly9leGFtcGxlLmNvbSIsImJhc2VVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImFzc2V0c1VybCI6Imh0dHBzOi8vY2hlY2tvdXQucGF5cGFsLmNvbSIsImRpcmVjdEJhc2VVcmwiOm51bGwsImFsbG93SHR0cCI6dHJ1ZSwiZW52aXJvbm1lbnROb05ldHdvcmsiOmZhbHNlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwiYmlsbGluZ0FncmVlbWVudHNFbmFibGVkIjp0cnVlLCJtZXJjaGFudEFjY291bnRJZCI6IklMUyIsImN1cnJlbmN5SXNvQ29kZSI6IklMUyJ9LCJtZXJjaGFudElkIjoiZHlrNTJwZnk1djJzZ3YyNCIsInZlbm1vIjoib2ZmIn0="
        },
        env: 'sandbox', // Or 'sandbox'
        commit: true, // This will add the transaction amount to the PayPal button

        payment: function (data, actions) {
            return actions.braintree.create({
                flow: 'checkout', // Required
                amount: 10.00, // Required
                currency: 'USD', // Required
                enableShippingAddress: true,
                shippingAddressEditable: false,
                shippingAddressOverride: {
                    recipientName: 'Scruff McGruff',
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


    return (
        <div className="">
            <div id="paypal-button"></div>
        </div>
    )
}

export default Payments;

