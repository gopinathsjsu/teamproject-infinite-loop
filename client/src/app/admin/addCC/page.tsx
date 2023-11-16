"use client";

import { getDataFromEndPoint } from "@/src/lib/backend-api";
import React, { useState } from "react";

// export default function Contact() {
//     const [formData, setFormData] = useState({
//         roletype: "",
//         role: "",
//         name: "",
//         image: "",
//     });

//     const roleOptions = [
//         { value: 'crew', label: 'Crew' },
//         { value: 'cast', label: 'Cast' },
//       ];

//     const castOptions = [
//         { value: 'actor', label: 'Actor' },
//         { value: 'actress', label: 'Actress' },
//         { value: 'otherActor', label: 'Other Actor' },
//       ];

//     const crewOptions = [
//         { value: 'director', label: 'Director' },
//         { value: 'producer', label: 'Producer' },
//         { value: 'musicDirector', label: 'Music Director' },
//         { value: 'otherCrew', label: 'Other Crew' },
//       ];

//     const [formSuccess, setFormSuccess] = useState(false)
//     const [formSuccessMessage, setFormSuccessMessage] = useState("")

//     const handleInput = (e: any) => {
//         const fieldName = e.target.name;
//         const fieldValue = e.target.value;

//         setFormData((prevState) => ({
//             ...prevState,
//             [fieldName]: fieldValue
//         }));
//     }

//     const submitForm = (e: any) => {
//         // We don't want the page to refresh
//         e.preventDefault()

//         const formURL = e.target.action
//         const data = new FormData()

//         // Turn our formData state into data we can use with a form submission
//         Object.entries(formData).forEach(([key, value]) => {
//             data.append(key, value);
//         })
//         const get_data = getDataFromEndPoint(JSON.stringify(formData), formURL, 'POST');
//         console.log(get_data);
//     }
//     const [isModalOpen, setModalOpen] = useState(false);

//     // Function to toggle modal visibility
//     const toggleModal = () => {
//         setModalOpen(!isModalOpen);
//     };
//     const closeModal = () => {
//         setModalOpen(false);
//     };
//     return (
//         <div className="relative flex flex-col justify-center overflow-hidden h-screen">
//             <div className="w-full p-6 mx-auto my-10 rounded-md shadow-md  lg:max-w-2xl">
//                 {!isModalOpen && (
//                     <div className="button-container">
//                         <button className="btn" onClick={toggleModal}>
//                             <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
//                                 <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
//                             </svg>
//                             Add to Industry
//                         </button>
//                     </div>

//                 )}
//                 {isModalOpen && (
//                     <dialog id="theatreModal" className="modal" open>
//                         <div className="modal-box">
//                             <button style={{ position: 'absolute', top: '0', left: '0' }} className="bg-ghost-500 hover:bg-blue-200 text-black font-bold py-2 px-4 rounded" onClick={closeModal}>
//                                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
//                                     <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
//                                 </svg>
//                             </button>
//                             <h1 className="text-xl font-semibold text-center">Add Theatre</h1>
//                             {formSuccess ?
//                                 <div>{formSuccessMessage}</div>
//                                 :
//                                 <form onSubmit={submitForm} action='/admin/addtheatre'>
//                                     <div>
//                                     <div className="text-lg font-semibold mb-2">
//                                         <label className="block text-gray-700 text-sm font-bold mb-2">Role Type</label>
//                                         <select name="roletype" onChange={handleInput} value={formData.roletype} className="input input-bordered w-full max-w-xs">
//                                         {roleOptions.map((option) => (
//                                             <option key={option.value} value={option.value}>
//                                             {option.label}
//                                             </option>
//                                         ))}
//                                         </select>
//                                     </div>

//                                     <div className="text-lg font-semibold mb-2">
//                                         <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
//                                         <select name="role" onChange={handleInput} value={formData.role} className="input input-bordered w-full max-w-xs">
//                                             {formData.roletype.toLowerCase() === 'cast'
//                                                 ? castOptions.map((option) => (
//                                                     <option key={option.value} value={option.value}>
//                                                     {option.label}
//                                                     </option>
//                                                 ))
//                                                 : crewOptions.map((option) => (
//                                                     <option key={option.value} value={option.value}>
//                                                     {option.label}
//                                                     </option>
//                                                 ))}
//                                         </select>
//                                     </div>
//                                     </div>
//                                     <div className="text-lg font-semibold mb-2">
//                                         <label className="block text-gray-700 text-sm font-bold mb-2">Artist Image</label>
//                                         <input type="file" name="image" onChange={handleInput} value={formData.image} className="file-input  w-full max-w-xs" />
//                                     </div>
//                                     <div className="text-lg font-semibold mb-2">
//                                         <label className="block text-gray-700 text-sm font-bold mb-2">Arist Name</label>
//                                         <input type="text" name="name" onChange={handleInput} value={formData.name} className="input input-bordered w-full max-w-xs" />
//                                     </div>
//                                     <div>
//                                         <button style={{ position: 'absolute', top: '0', right: '0' }} className="bg-ghost-500 hover:bg-blue-200 text-black font-bold py-2 px-4 rounded" type="submit">
//                                             <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
//                                                 <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
//                                             </svg>
//                                         </button>
//                                     </div>
//                                 </form>
//                             }
//                         </div>
//                     </dialog>
//                 )}
//             </div>
//         </div >
//     )
// }

const screenData = [
  {
    id: 1,
    name: "Mahesh babu",
    roletype: "Cast",
    role: "Actor",
    imageUrl:"https://m.media-amazon.com/images/I/51TGhuM+jAL._AC_UF894,1000_QL80_.jpg", // Dummy image URL for a larger movie poster
  },
];

const ScreenCard = ({ screen }: { screen: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex items-start bg-white rounded-lg shadow-lg overflow-hidden m-4">
      <img
        className="w-48 h-auto object-cover flex-none"
        src={screen.imageUrl}
        alt={`Poster of ${screen.name}`}
      />
      <div className="flex-1 p-4 relative">
        <div className="font-bold text-xl mb-2">{screen.name}</div>
        <p className="text-gray-700 text-base">Name: {screen.name}</p>
        <p className="text-gray-700 text-base">Role Type: {screen.roletype}</p>
        <p className="text-gray-700 text-base">Role: {screen.role}</p>
        {screen.currentMovie && (
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add member to industry
            </button>
          </div>
        )}
      </div>
      {/* {isModalOpen && (
          // Modal component here
          // You would create a separate Modal component and include it here
        )} */}
    </div>
  );
};

const ScreensPage = () => {
  const [formData, setFormData] = useState({
    roletype: "",
    role: "",
    name: ""
    });

  const roleOptions = [
    { value: "", label: "" },
    { value: "crew", label: "Crew" },
    { value: "cast", label: "Cast" },
  ];

  const castOptions = [
    { value: "", label: "" },
    { value: "actor", label: "Actor" },
    { value: "actress", label: "Actress" },
    { value: "otherActor", label: "Other Actor" },
  ];

  const crewOptions = [
    { value: "", label: "" },
    { value: "director", label: "Director" },
    { value: "producer", label: "Producer" },
    { value: "musicDirector", label: "Music Director" },
    { value: "otherCrew", label: "Other Crew" },
  ];

  const [formSuccess, setFormSuccess] = useState(false);
  const [formSuccessMessage, setFormSuccessMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleInput = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const handleFileChange = (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const submitForm = (e: any) => {
    e.preventDefault();
    if (selectedFile) {
      const formURL = e.target.action;
      const data = new FormData();
      data.append("file", selectedFile);
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      console.log(data);
      const get_data = getDataFromEndPoint(data, formURL, "POST");
      console.log(get_data);
    }
  };
  const [isModalOpen, setModalOpen] = useState(false);

  // Function to toggle modal visibility
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  const closeModal = () => {
    setModalOpen(false);
  };


  return (
    <div>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <p className="text-3xl font-bold text-gray-900">Movie Industry</p>
          {!isModalOpen && (
            <button className="btn" onClick={toggleModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="25"
                height="25"
              >
                <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
              </svg>
              Add to Industry
            </button>
          )}
        </div>
        {isModalOpen && (
          <dialog id="theatreModal" className="modal" open>
            <div className="modal-box">
              <button
                style={{ position: "absolute", top: "0", left: "0" }}
                className="bg-ghost-500 hover:bg-blue-200 text-black font-bold py-2 px-4 rounded"
                onClick={closeModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="20"
                  height="20"
                  viewBox="0 0 50 50"
                >
                  <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                </svg>
              </button>
              <h1 className="text-xl font-semibold text-center">
                Add to Industry
              </h1>
              {formSuccess ? (
                <div>{formSuccessMessage}</div>
              ) : (
                <form onSubmit={submitForm} encType='multipart/form-data' action="/artist/add" method="POST">
                  <div>
                    <div className="text-lg font-semibold mb-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Role Type
                      </label>
                      <select
                        name="roletype"
                        onChange={handleInput}
                        value={formData.roletype}
                        className="input input-bordered w-full max-w-xs"
                      >
                        {roleOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="text-lg font-semibold mb-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Role
                      </label>
                      <select
                        name="role"
                        onChange={handleInput}
                        value={formData.role}
                        className="input input-bordered w-full max-w-xs"
                      >
                        {formData.roletype.toLowerCase() === "cast"
                          ? castOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))
                          : crewOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                      </select>
                    </div>
                  </div>
                  <div className="text-lg font-semibold mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Artist Image
                    </label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleFileChange}
                      className="file-input  w-full max-w-xs"
                    />
                  </div>
                  <div className="text-lg font-semibold mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Arist Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      onChange={handleInput}
                      value={formData.name}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </div>
                  <div>
                    <button
                      style={{ position: "absolute", top: "0", right: "0" }}
                      className="bg-ghost-500 hover:bg-blue-200 text-black font-bold py-2 px-4 rounded"
                      type="submit"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="25"
                        height="25"
                        viewBox="0 0 50 50"
                      >
                        <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
                      </svg>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </dialog>
        )}
      </div>

      <div className="flex flex-wrap justify-center">
        {screenData.map((screen) => (
          <ScreenCard key={screen.id} screen={screen} />
        ))}
      </div>
    </div>
  );
};

export default ScreensPage;
