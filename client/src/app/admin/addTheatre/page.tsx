"use client";
import { getDataFromEndPoint } from "@/src/lib/backend-api";
import React, { useState } from "react"

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        theatreName: "",
        city: "",
        locationUrl: "",
        zipcode: "",
        phno: "",
        gmail: "",
        address: "",
        state: "",
    });

    const [formSuccess, setFormSuccess] = useState(false)
    const [formSuccessMessage, setFormSuccessMessage] = useState("")
    const [selectedFile, setSelectedFile] = useState(null);

    const handleInput = (e: any) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        setFormData((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue
        }));
    }

    const handleFileChange = (e: any) => {
        e.preventDefault();
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const submitForm = (e: any) => {
        e.preventDefault()
        if (selectedFile) {
            const formURL = e.target.action
            const data = new FormData()
            data.append('file', selectedFile);
            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value);
            });

            console.log(data);
            const get_data = getDataFromEndPoint(data, formURL, 'POST');
            console.log(get_data);
        }
    }
    const [isModalOpen, setModalOpen] = useState(false);

    // Function to toggle modal visibility
    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };
    const closeModal = () => {
        setModalOpen(false);
    };
    return (
        <div className="relative flex flex-col justify-center overflow-hidden h-screen">
            <div className="w-full p-6 mx-auto my-10 rounded-md shadow-md  lg:max-w-xl">
                {!isModalOpen && (
                    < button className="btn" onClick={toggleModal} >
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
                            <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
                        </svg>
                        Add Theatre
                    </button>
                )}
                {isModalOpen && (
                    <dialog id="theatreModal" className="modal" open>
                        <div className="modal-box">
                            <button style={{ position: 'absolute', top: '0', left: '0' }} className="bg-ghost-500 hover:bg-blue-200 text-black font-bold py-2 px-4 rounded" onClick={closeModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                                    <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                                </svg>
                            </button>
                            <h1 className="text-xl font-semibold text-center">Add Theatre</h1>
                            {formSuccess ?
                                <div>{formSuccessMessage}</div>
                                :
                                <form onSubmit={submitForm} encType='multipart/form-data' action='/Theatre/addTheatre' >
                                    <div className="text-lg font-semibold mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Theatre Name</label>
                                        <input type="text" name="theatreName" onChange={handleInput} value={formData.theatreName} placeholder="Theatre Name" className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div className="text-lg font-semibold mb-2">
                                        <label htmlFor="file-upload" className="block text-gray-700 text-sm font-bold mb-2">Theatre Image
                                            <input type="file" name="file" onChange={handleFileChange} className="file-input  w-full max-w-xs" />
                                        </label>
                                    </div>
                                    <div className="text-lg font-semibold mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                                        <input type="text" name="address" onChange={handleInput} value={formData.address} placeholder="address" className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div className="text-lg font-semibold mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
                                        <input type="text" name="city" onChange={handleInput} value={formData.city} placeholder="city" className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div className="text-lg font-semibold mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">LocationUrl</label>
                                        <input type="text" name="locationUrl" onChange={handleInput} value={formData.locationUrl} placeholder="locationUrl" className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div className="text-lg font-semibold mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Zip Code</label>
                                        <input type="text" name="zipcode" onChange={handleInput} value={formData.zipcode} placeholder="zip code" className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div className="text-lg font-semibold mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">State</label>
                                        <input type="text" name="state" onChange={handleInput} placeholder="state" value={formData.state} className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div className="text-lg font-semibold mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                                        <input type="text" name="phno" onChange={handleInput} value={formData.phno} placeholder="Phone Number" className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div className="text-lg font-semibold mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">gmail</label>
                                        <input type="text" name="gmail" onChange={handleInput} value={formData.gmail} placeholder="gmail" className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div>
                                        <button style={{ position: 'absolute', top: '0', right: '0' }} className="bg-ghost-500 hover:bg-blue-200 text-black font-bold py-2 px-4 rounded" type="submit">
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
                                                <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </form>
                            }
                        </div>
                    </dialog>
                )}
            </div>
        </div >
    )
}