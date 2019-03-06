import React, { useState } from "react";
import axios from 'axios';

function ContactUs() {

    const [email, setEmail] = useState(null);
    const [message, setMessage] = useState(null);
    const [subject, setSubject] = useState(null);

    const postRequest = () => {
     
        const data = { email, message, subject }
        axios.post(`http://localhost:5000/contactUs`, data)
            .then((response) => {
                console.log("Success contactUs", response)
            }).catch((err) => console.log(err.response))
    }

    return (
        <div className="contact-us">
        <h3>Contact Us</h3>
            <div className="email-text">
                Work email
            </div>
            <input className="email-input" type="text" onChange={(e) => setEmail(e.target.value)}>

            </input>
            <div className="subject-text">
                Subject
            </div>
            <select className="subject-input" onChange={(e) => setSubject(e.target.value)} placeholder="Select">
                <option value="Select">Select</option>
                <option value="Billing">Billing</option>
                <option value="Pricing">Pricing</option>
                <option value="Other">Other</option>
            </select>
            <div className="message-text">
                Message
            </div>
            <textarea className="message-input" type="text" onChange={(e) => setMessage(e.target.value)}>

            </textarea>
            <button type="button" onClick={postRequest}>Submit</button>
        </div>
    )
}

export default ContactUs;

