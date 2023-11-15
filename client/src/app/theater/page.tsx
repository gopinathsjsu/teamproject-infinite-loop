import InnerPageContainer from "../components/dashboard/common/InnerPageContainer"

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

    return (
        // <div className="m-auto container px-4 py-6 max-w-7xl">
        //     <h1 className="text-3xl font-bold text-gray-900 mb-6">Theaters</h1>
        //     <div className="grid grid-cols-1 gap-6">
        //         {theaters.map((theater, index) => (
        //             <div key={index} className="border border-gray-300 p-6 rounded-lg flex flex-col md:flex-row items-center">
        //                 <img src={theater.imageUrl} alt="Movie Poster" className="mb-4 md:mb-0 md:mr-6 w-48 h-auto rounded-lg shadow-md" />
        //                 <div className="flex-1">
        //                     <h3 className="font-semibold text-xl mb-2">{theater.name}</h3>
        //                     <p className="text-gray-600 mb-1">{theater.description}</p>
        //                     <p className="text-gray-600 mb-1">{theater.address}</p>
        //                     {theater.screenDetails.map((screen) =>(
        //                         <button className=" mr-1 btn btn-outline btn-secondary">{screen}</button>
        //                     ))}
        //                 </div>
        //             </div>
        //         ))}
        //     </div>
        // </div>
        <div className="container mx-auto px-4 py-6 max-w-7xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Theaters</h1>
            <div className="grid grid-cols-1 gap-6">
                {theaters.map((theater, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center md:items-start">
                        <img src={theater.imageUrl} alt="Theater" className="mb-4 md:mb-0 md:mr-6 w-48 h-auto rounded-lg" />
                        <div className="flex-1">
                            <a href={theater.locationUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                <h3 className="font-semibold text-xl mb-2">{theater.name}</h3>
                            </a>
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