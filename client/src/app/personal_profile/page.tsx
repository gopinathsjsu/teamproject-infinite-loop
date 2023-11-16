'use client'
import React, { ChangeEvent, useState } from "react";
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
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    state: ""
  });
  const [formSuccess, setFormSuccess] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);


  
  const handleInput = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const submitForm = (e:any) => {
    e.preventDefault();

    // Create a new FormData object
    const data = new FormData();

    // Append each key-value pair from formData state to the FormData object
    Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
    });

    // POST the FormData to the URL of the form
    const formURL = e.target.action;
    fetch(formURL, {
        method: "POST",
        body: data,
        // Do not set the Content-Type header when using FormData
    }).then((response) => response.json())
    .then((data) => {
        // Reset the form and handle other states as needed
        setFormData({ 
            firstName: "",
            lastName: "",
            birthDate: "",
            identity: "",
            maritalStatus: "",
            zip: "",
            phone: "",
            email: "",
            addressLine1: "",
            addressLine2: "",
            landmark: "",
            city: "",
            state: ""
        });
        setFormSuccess(true);
        setIsEditable(false);
    });
}


const handleFileChange = (e: any) => {
  e.preventDefault();
  const file = e.target.files[0];
  setSelectedFile(file);
};

  return (
    <div>
        <form method="POST" action="https://www.formbackend.com/f/664decaabbf1c319" onSubmit={submitForm}>
          <InnerPageContainer title={`Hi, ${formData.firstName} ${formData.lastName}`}>
            <div className="bg-white p-8 rounded-lg shadow">
              <div className="flex flex-col items-center mb-6">
                <div className="flex items-center mb-4">
                <div className="text-lg font-semibold mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      User Image
                    </label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleInput}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </div> 
                  <div className="ml-4">
                    <p className="text-sm">{formData.email}</p>
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
                        <label className="block text-gray-700 text-sm font-bold mb-2">End Date</label>
                        <input
                        type="date" // Use type="date" for date picker
                        name="birthDate"
                        onChange={handleInput}
                        value={formData.birthDate}
                        className="border p-2 rounded w-full"
                        />
                </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Identity</label>
                    <select name="identity" onChange={handleInput} value={formData.identity}  className="border rounded w-full p-2">
                      <option value=""></option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Marital Status</label>
                    <select name="maritalStatus" onChange={handleInput} value={formData.maritalStatus}  className="border rounded w-full p-2">
                      <option value=""></option>
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

              
            </div>
          </InnerPageContainer>
        </form>
      )
    </div>
  );
}
