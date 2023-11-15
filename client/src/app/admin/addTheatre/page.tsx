"use client";
import { getDataFromEndPoint } from "@/src/lib/backend-api";
import React, { useState } from "react"

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [formSuccess, setFormSuccess] = useState(false)
    const [formSuccessMessage, setFormSuccessMessage] = useState("")

    const handleInput = (e: any) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        setFormData((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue
        }));
    }

    const submitForm = (e: any) => {
        // We don't want the page to refresh
        e.preventDefault()

        const formURL = e.target.action
        const data = new FormData()

        // Turn our formData state into data we can use with a form submission
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        })
        const get_data = getDataFromEndPoint(JSON.stringify(formData), formURL, 'POST'L);
        console.log(get_data);
    }

    return (
        <div>
            <h1>Contact form</h1>
            {formSuccess ?
                <div>{formSuccessMessage}</div>
                :
                <form onSubmit={submitForm} action='/admin/addtheatre'>
                    <div>
                        <label>Name</label>
                        <input type="text" name="name" onChange={handleInput} value={formData.name} />
                    </div>

                    <div>
                        <label>Email</label>
                        <input type="text" name="email" onChange={handleInput} value={formData.email} />
                    </div>

                    <div>
                        <label>Message</label>
                        <textarea name="message" onChange={handleInput} value={formData.message}></textarea>
                    </div>

                    <button type="submit">Send message</button>
                </form>
            }
        </div>
    )
}