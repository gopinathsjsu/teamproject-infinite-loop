"use client"
import { getDataFromEndPoint } from "@/src/lib/backend-api";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export interface theater {
    name: string,
    description: string,
    locationUrl: string,
    address: string,
    screenDetails: string[],
    imageUrl: string,
    nScreens: number,
    email: string,
    phoneNumber: string,
}

const theaters: theater[] = [
    {
        name: "cinemark",
        description: "new Theater",
        locationUrl: "someurl",
        address: "some address",
        screenDetails: ["screen1", "screen2"],
        imageUrl: "https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810", // Dummy image URL for a larger movie poster
        nScreens: 2,
        email: "cinemark@gmail.com",
        phoneNumber: "1234567890",
    },
];

export default function Theater() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
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

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    const addScreen = () => {
        router.push("/theater/1/screens")
    }

    return (
        <div className="container mx-auto px-4 py-6 max-w-7xl">
            <div className="flex justify-between items-center mb-6">
                <p className="text-3xl font-bold text-gray-900">Theaters</p>
                {!isModalOpen && (
                    <button className="btn" onClick={toggleModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="25" height="25">
                            <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
                        </svg>
                        Add Theatre
                    </button>
                )}
            </div>
            {isModalOpen && (
                <dialog id="theatreModal" className="m-auto modal" open>
                    <div className="modal-box w-11/12 max-w-5xl">
                        <button style={{ position: 'absolute', top: '0', left: '0' }} className="bg-ghost-500 hover:bg-blue-200 text-black font-bold py-2 px-4 rounded" onClick={closeModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                                <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                            </svg>
                        </button>
                        <h1 className="text-xl font-semibold text-center">Add Theatre</h1>
                        {formSuccess ?
                            <div>{formSuccessMessage}</div>
                            :
                            <form onSubmit={submitForm} encType='multipart/form-data' action='/Theatre/addtheatre'>
                                <div className="flex flex-row justify-center">
                                    <div className="text-lg basis-1/2 font-semibold mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Theatre Name</label>
                                        <input type="text" name="name" onChange={handleInput} value={formData.name} className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div className="text-lg basis-1/2 font-semibold mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                                        <input type="text" name="address" onChange={handleInput} value={formData.address} className="input input-bordered w-full max-w-xs" />
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    <div className="text-lg basis-1/2 font-semibold mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Theatre Image</label>
                                        <input type="file" name="file" onChange={handleFileChange} className="file-input  w-full max-w-xs" />
                                    </div>
                                    <div className="text-lg basis-1/2 font-semibold mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
                                        <input type="text" name="city" onChange={handleInput} value={formData.city} className="input input-bordered w-full max-w-xs" />
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    <div className="text-lg basis-1/2 font-semibold mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">LocationUrl</label>
                                        <input type="text" name="locationUrl" onChange={handleInput} value={formData.locationUrl} className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div className="text-lg basis-1/2 font-semibold mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Zip Code</label>
                                        <input type="text" name="zipcode" onChange={handleInput} value={formData.zipcode} className="input input-bordered w-full max-w-xs" />
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    <div className="text-lg basis-1/2 font-semibold mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">State</label>
                                        <input type="text" name="state" onChange={handleInput} value={formData.state} className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div className="text-lg basis-1/2 font-semibold mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                                        <input type="text" name="phno" onChange={handleInput} value={formData.phno} className="input input-bordered w-full max-w-xs" />
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    <div className="text-lg basis-1/2 font-semibold mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">gmail</label>
                                        <input type="text" name="gmail" onChange={handleInput} value={formData.gmail} className="input input-bordered w-full max-w-xs" />
                                    </div>
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
            <div className="grid grid-cols-1 gap-6">
                {theaters.map((theater, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center md:items-start">
                        <img src={theater.imageUrl} alt="Theater" className="mb-4 md:mb-0 md:mr-6 w-48 h-auto rounded-lg" />
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-6">
                                <a href={theater.locationUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    <h3 className="font-semibold text-xl mb-2">{theater.name}</h3>
                                </a>
                                <span>
                                    <button className="btn btn-square">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 2.175a2.75 2.75 0 0 1 3.889 3.889L10.5 14.696l-4.75.594a.75.75 0 0 1-.849-.849l.594-4.75 8.737-8.616z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 3.636a1.75 1.75 0 1 1 2.475 2.475L19 8.95" />
                                        </svg>
                                    </button>
                                    <button className="btn" onClick={addScreen}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="25" height="25">
                                            <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
                                        </svg>
                                        Show Screens
                                    </button>
                                </span>
                            </div>

                            <p className="text-gray-600 mb-1">{theater.description}</p>
                            <p className="text-gray-600 mb-1">{theater.address}</p>
                            <div className="flex flex-wrap items-center mb-4">
                                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2 mb-2">{`Screens: ${theater.nScreens}`}</span>
                                {theater.screenDetails.map((screen, screenIndex) => (
                                    <span key={screenIndex} className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-2 mb-2">{screen}</span>
                                ))}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <span className="mr-4"><i className="fas fa-envelope mr-1"></i>{theater.email}</span>
                                <span><i className="fas fa-phone mr-1"></i>{theater.phoneNumber}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}