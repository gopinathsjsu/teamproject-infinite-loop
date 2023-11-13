import InnerPageContainer from "../components/dashboard/common/InnerPageContainer";

// Dummy data, replace with real user data as needed
const userData = {
  name: "Yeshvanth Raju Kurapati",
  zip: "95126",
  phone: "669-204-8989",
  email: "yeshvanthraju.k@gmail.com",
  movieRewardsId: "31081146",
  imageUrl: "https://play-lh.googleusercontent.com/XaDxAgZFNbbAEF7zx0hzNXJbr8dMnJy_lBYnxk7eDnOxwjkciMhn0UKYoUez7EzJEuI", // Replace with the actual image path
  shippingAddress: "123 Main St, San Jose, CA 95126", // Dummy shipping data
  // Add other necessary user details
};

export default function Profile() {
    return (
      <InnerPageContainer title="Profile & Payment">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-2/3 bg-white p-8 rounded-lg shadow">
            <div className="flex flex-col items-center mb-6">
              <img 
                src={userData.imageUrl} 
                alt="Profile" 
                className="w-40 h-40 object-cover rounded-full border-2 border-gray-300"
              />
              <h2 className="text-2xl font-semibold mt-3">{userData.name}</h2>
              {/* Optionally, add upload or edit button here */}
            </div>
            <h2 className="text-xl font-semibold mb-6">Account Profile</h2>
            <div className="mb-6">
              <h3 className="font-semibold">Personal Information</h3>
              <p>ZIP Code: {userData.zip}</p>
              <p>{userData.phone}</p>
              <p>{userData.email}</p>
              <p>Movie Rewards ID: {userData.movieRewardsId}</p>
              {/* Add edit buttons and functionality */}
            </div>
            <div className="mb-6">
              <h3 className="font-semibold">Shipping Information</h3>
              <p>{userData.shippingAddress}</p>
              {/* Optionally, add edit button for shipping info */}
            </div>
            <div className="mb-6">
              <h3 className="font-semibold">Two-Factor Authentication</h3>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Enable 2FA
              </button>
              {/* This button can be linked to 2FA enable/disable functionality */}
            </div>
          </div>
          <div className="w-full lg:w-1/3 bg-white p-8 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-6">Quick Links</h2>
            {/* Add quick links */}
          </div>
        </div>
        {/* Add payment method section */}
      </InnerPageContainer>
    )
}
