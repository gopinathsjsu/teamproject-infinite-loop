'use client'
import React, { useState } from "react";
import InnerPageContainer from "../components/dashboard/common/InnerPageContainer";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    identity: "",
    maritalStatus: "",
    zip: "",
    phone: "",
    email: "",
    imageUrl: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    state: ""
  });
  const [formSuccess, setFormSuccess] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const handleInput = (e:any) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const submitForm = (e:any) => {
    e.preventDefault();
    console.log(formData); // Here, add logic to handle form submission
    // POST the data to the URL of the form
    const formURL = e.target.action
    fetch(formURL, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
        'accept': 'application/json',
        },
    }).then((response) => response.json())
    .then((data) => {
        setFormData({ 
        firstName: "",
        lastName: "",
        birthDate: "", // Placeholder for birthdate
        identity: "", // Placeholder for identity
        maritalStatus: "", // Placeholder for marital status
        zip: "",
        phone: "",
        email: "",
        imageUrl: "", // Replace with the actual image path
        addressLine1: "", // Dummy address data
        addressLine2: "", // Dummy address data
        landmark: "", // Dummy data
        city: "", // Dummy data
        state: ""
        })
    // Simulating a successful form submission response
    setFormSuccess(true);
    setIsEditable(false); // Make form read-only again after submission
    })
}

  return (
    <div>
        <form method="POST" action="https://www.formbackend.com/f/664decaabbf1c319" onSubmit={submitForm}>
          <InnerPageContainer title={`Hi, ${formData.firstName} ${formData.lastName}`}>
            <div className="bg-white p-8 rounded-lg shadow">
              <div className="flex flex-col items-center mb-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={formData.imageUrl} 
                    alt="Profile" 
                    className="w-20 h-20 object-cover rounded-full border-2 border-gray-300"
                  />
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold">{`${formData.firstName} ${formData.lastName}`}</h2>
                    <p className="text-sm">{formData.email}</p>
                  </div>
                </div>
              </div>
              {!isEditable && (
                <button type="button" onClick={toggleEdit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Edit details
                </button>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                    <input type="text" name="firstName" placeholder="First Name" readOnly={!isEditable} onChange={handleInput} value={formData.firstName} className="border p-2 rounded w-full"/>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                    <input type="text" name="lastName" placeholder="Last Name" readOnly={!isEditable} onChange={handleInput} value={formData.lastName} className="border p-2 rounded w-full"/>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Birthday</label>
                    <input type="text" name="birthDate" placeholder="mm/dd/yyyy" readOnly={!isEditable} onChange={handleInput} value={formData.birthDate} className="border p-2 rounded w-full"/>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Identity</label>
                    <select name="identity" onChange={handleInput} value={formData.identity}  className="border rounded w-full p-2">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Marital Status</label>
                    <select name="maritalStatus" onChange={handleInput} value={formData.maritalStatus}  className="border rounded w-full p-2">
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                    <input type="email" name="email" placeholder="Email Address" onChange={handleInput} readOnly={!isEditable} value={formData.email} className="border p-2 rounded w-full"/>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Mobile Number</label>
                    <input type="tel" name="phone" placeholder="Mobile Number" onChange={handleInput} readOnly={!isEditable} value={formData.phone} className="border p-2 rounded w-full"/>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Address</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Area Pincode</label>
                    <input type="text" name="zip" placeholder="Area Pincode" onChange={handleInput} readOnly={!isEditable} value={formData.zip} className="border p-2 rounded w-full"/>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Address Line 1</label>
                    <input type="text" name="addressLine1" placeholder="Address Line 1" onChange={handleInput} readOnly={!isEditable} value={formData.addressLine1} className="border p-2 rounded w-full"/>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Address Line 2</label>
                    <input type="text" name="addressLine2" placeholder="Address Line 2" onChange={handleInput} readOnly={!isEditable} value={formData.addressLine2} className="border p-2 rounded w-full"/>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Landmark</label>
                    <input type="text" name="landmark" placeholder="Landmark" onChange={handleInput} readOnly={!isEditable} value={formData.landmark} className="border p-2 rounded w-full"/>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Town / City</label>
                    <input type="text" name="city" placeholder="Town / City" onChange={handleInput} readOnly={!isEditable} value={formData.city} className="border p-2 rounded w-full"/>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">State</label>
                    <input type="text" name="state" placeholder="State" onChange={handleInput} readOnly={!isEditable} value={formData.state} className="border p-2 rounded w-full"/>
                  </div>
                </div>
              </div>

              {isEditable ? (
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Submit
                </button>
              ) : (
                <button type="button" onClick={toggleEdit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Edit details
                </button>
              )}
            </div>
          </InnerPageContainer>
        </form>
      )
    </div>
  );
}
