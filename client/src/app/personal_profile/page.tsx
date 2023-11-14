import InnerPageContainer from "../components/dashboard/common/InnerPageContainer";
import React from 'react';

// Dummy data, replace with real user data as needed
const userData = {
  firstName: "Yeshvanth",
  lastName: "Raju Kurapati",
  birthDate: "", // Placeholder for birthdate
  identity: "Male", // Placeholder for identity
  maritalStatus: "Single", // Placeholder for marital status
  zip: "95126",
  phone: "+91 - 8919477263",
  email: "yeshvanthraju.k@gmail.com",
  imageUrl: "https://play-lh.googleusercontent.com/XaDxAgZFNbbAEF7zx0hzNXJbr8dMnJy_lBYnxk7eDnOxwjkciMhn0UKYoUez7EzJEuI", // Replace with the actual image path
  addressLine1: "Flat no., House no., Building,", // Dummy address data
  addressLine2: "Area, Colony, Street, Sector, Village", // Dummy address data
  landmark: "Prithvi Theater", // Dummy data
  city: "Mumbai", // Dummy data
  state: "Maharashtra", // Dummy data
};

export default function Profile() {
  return (
    <InnerPageContainer title={`Hi, ${userData.firstName} ${userData.lastName}`}>
      <div className="bg-white p-8 rounded-lg shadow">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center mb-4">
            <img 
              src={userData.imageUrl} 
              alt="Profile" 
              className="w-20 h-20 object-cover rounded-full border-2 border-gray-300"
            />
            <div className="ml-4">
              <h2 className="text-xl font-semibold">{`${userData.firstName} ${userData.lastName}`}</h2>
              <p className="text-sm">{userData.email}</p>
            </div>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Edit Profile
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                First Name
              </label>
              <input type="text" placeholder="First Name" defaultValue={userData.firstName} className="border p-2 rounded w-full"/>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Last Name
              </label>
              <input type="text" placeholder="Last Name" defaultValue={userData.lastName} className="border p-2 rounded w-full"/>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Birthday
              </label>
              <input type="text" placeholder="mm/dd/yyyy" defaultValue={userData.birthDate} className="border p-2 rounded w-full"/>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Identity
              </label>
              <select defaultValue={userData.identity} className="border rounded w-full p-2">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Marital Status
              </label>
              <select defaultValue={userData.maritalStatus} className="border rounded w-full p-2">
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
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input type="email" placeholder="Email Address" defaultValue={userData.email} className="border p-2 rounded w-full"/>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Mobile Number
              </label>
              <input type="tel" placeholder="Mobile Number" defaultValue={userData.phone} className="border p-2 rounded w-full"/>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Address</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Area Pincode
              </label>
              <input type="text" placeholder="Area Pincode" defaultValue={userData.zip} className="border p-2 rounded w-full"/>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Address Line 1
              </label>
              <input type="text" placeholder="Address Line 1" defaultValue={userData.addressLine1} className="border p-2 rounded w-full"/>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Address Line 2
              </label>
              <input type="text" placeholder="Address Line 2" defaultValue={userData.addressLine2} className="border p-2 rounded w-full"/>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Landmark
              </label>
              <input type="text" placeholder="Landmark" defaultValue={userData.landmark} className="border p-2 rounded w-full"/>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Town / City
              </label>
              <input type="text" placeholder="Town / City" defaultValue={userData.city} className="border p-2 rounded w-full"/>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                State
              </label>
              <input type="text" placeholder="State" defaultValue={userData.state} className="border p-2 rounded w-full"/>
            </div>
          </div>
        </div>
      </div>
    </InnerPageContainer>
  )
}
