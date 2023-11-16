'use client'
import React, { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [formSuccess, setFormSuccess] = useState(false)
  const [formSuccessMessage, setFormSuccessMessage] = useState("")

  const handleInput = (e:any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  }

  const submitForm = (e:any) => {
    // We don't want the page to refresh
    e.preventDefault()

    const formURL = e.target.action
    const data = new FormData()


    // Turn our formData state into data we can use with a form submission
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    })
    console.log(formData);

    // POST the data to the URL of the form
    fetch(formURL, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        'accept': 'application/json',
      },
    }).then((response) => response.json())
    .then((data) => {
      setFormData({ 
        name: "", 
        email: "", 
        message: "" 
      })

      setFormSuccess(true)
      setFormSuccessMessage(data.submission_text)
    })
  }

  return (
    <div>
      <h1>Contact form</h1>
      {formSuccess ? 
        <div>{formSuccessMessage}</div> 
        : 
        <form method="POST" action="https://www.formbackend.com/f/664decaabbf1c319" onSubmit={submitForm}>
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