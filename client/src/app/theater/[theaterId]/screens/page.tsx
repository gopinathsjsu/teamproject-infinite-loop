"use client"
import React, { useState } from 'react';
import { getDataFromEndPoint } from "@/src/lib/backend-api";
import ChildComponent from './child';
import CustomizeRows from './customSeat';

const screenData = [
    {
        id: 1,
        name: 'Screen 1',
        timings: ['9:30 AM', '1:00 PM', '4:00 PM', '7:00 PM'],
        maxCapacity: 200,
        currentMovie: 'The Big Adventure',
        imageUrl: "https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810", // Dummy image URL for a larger movie poster
        format: '3D',
    },
    {
        id: 2,
        name: 'Screen 1',
        timings: ['9:30 AM', '1:00 PM', '4:00 PM', '7:00 PM'],
        maxCapacity: 200,
        currentMovie: 'The Big Adventure',
        imageUrl: "https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810", // Dummy image URL for a larger movie poster
        format: '3D',
    },
    {
        id: 3,
        name: 'Screen 1',
        timings: ['9:30 AM', '1:00 PM', '4:00 PM', '7:00 PM'],
        maxCapacity: 200,
        currentMovie: 'The Big Adventure',
        imageUrl: "https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810", // Dummy image URL for a larger movie poster
        format: '3D',
    },
    {
        id: 4,
        name: 'Screen 1',
        timings: ['9:30 AM', '7:00 PM'],
        maxCapacity: 200,
        currentMovie: 'The Big Adventure',
        imageUrl: "https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810", // Dummy image URL for a larger movie poster
        format: '3D',
    },
    // ... other screen data
];


const ScreenCard = ({ screen }: { screen: any }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="w-3/5 flex items-start bg-white rounded-lg shadow-lg overflow-hidden m-4">
            <img className="w-48 h-auto object-cover flex-none" src={screen.imageUrl} alt={`Poster of ${screen.currentMovie}`} />
            <div className="flex-1 p-4 relative">
                <div className="absolute top-0 right-0 m-2">
                    <button className="text-gray-700 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </button>
                    <button className="text-gray-700 hover:text-gray-900 ml-2" onClick={toggleModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.5 4.5m0 0l-4.5 4.5m4.5-4.5H3" />
                        </svg>
                    </button>
                </div>
                <div className="font-bold text-xl mb-2">{screen.name}</div>
                <p className="text-gray-700 text-base">Current Movie: {screen.currentMovie}</p>
                <p className="text-gray-700 text-base">Format: {screen.format}</p>
                <p className="text-gray-700 text-base">Max Capacity: {screen.maxCapacity}</p>
                <div className="pt-4">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Timings:</span>
                    {screen.timings.map((time: any, index: any) => (
                        <span key={index} className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">{time}</span>
                    ))}
                </div>
                {screen.currentMovie && (
                    <div className='mt-10'>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Watch Movie
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
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const [screenName, setScreenName] = useState('');
    const [timings, setTimings] = useState<string[]>([]);
    const [format, setFormat] = useState('');

    const timingOptions = ['9:30AM', '12:30PM', '6:00PM', '10PM'];
    const formatOptions = ['2D', '3D', 'IMAX', '4DX'];

    const handleTimingChange = (event: any) => {
        const selectedTimings = event.target.value;
        let newTimings;
        if (timings.includes(selectedTimings)) {
            newTimings = timings.filter(timing => timing !== selectedTimings);
        } else {
            newTimings = [...timings, selectedTimings];
        }
        setTimings(newTimings);
    };


    const [dataFromChild, setDataFromChild] = useState<any>(null);

    const handleDataFromChild = (childData: React.SetStateAction<null>) => {
        setDataFromChild(childData);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (dataFromChild) {
            const data = {
                name: screenName,
                timing: timings,
                format: format,
                seats: dataFromChild.seatDetails,
                rows: dataFromChild.row,
                col: dataFromChild.column,
                cost: dataFromChild.cost,
            }
            const formURL = event.target.action
            const get_data = getDataFromEndPoint(data, formURL, 'POST');
        }
    };

    return (
        <div>
            <div className="container mx-auto px-4 py-6 max-w-7xl">
                <div className="flex justify-between items-center mb-6">
                    <p className="text-3xl font-bold text-gray-900">Theaters</p>
                    {!isModalOpen && (
                        <button className="btn" onClick={toggleModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="25" height="25">
                                <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
                            </svg>
                            New Screen
                        </button>
                    )}
                </div>
                {isModalOpen && (
                    <dialog id="screenModal" className="m-auto modal" open>
                        <div className="modal-box w-11/12 max-w-5xl">
                            <button style={{ position: 'absolute', top: '0', left: '0' }} className="bg-ghost-500 hover:bg-blue-200 text-black font-bold py-2 px-4 rounded" onClick={closeModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                                    <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                                </svg>
                            </button>
                            <h1 className="text-xl font-semibold text-center">Add Screen</h1>
                            <form onSubmit={handleSubmit} action='/Screen/addScreen'>
                                <div className="flex flex-row justify-center">
                                    <div className="form-control w-full max-w-xs mb-2">
                                        <label className="label">
                                            <span className="label-text">Screen Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={screenName}
                                            onChange={(e) => setScreenName(e.target.value)}
                                            className="input input-bordered"
                                        />
                                    </div>
                                    <div className='form-control w-full max-w-xs'>
                                        <label className="label-text">Timing</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {timingOptions.map((time) => (
                                                <div key={time} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="genre"
                                                        value={time}
                                                        onChange={handleTimingChange}
                                                        checked={timings.includes(time)}
                                                        className="form-checkbox h-5 w-5 text-blue-600"
                                                    />
                                                    <label className="ml-2 text-gray-700">{time}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">Format</span>
                                        </label>
                                        <select
                                            value={format}
                                            onChange={(e) => setFormat(e.target.value)}
                                            name="format"
                                            className="select select-bordered"
                                        >
                                            <option disabled value="">Select format</option>
                                            {formatOptions.map((f, index) => (
                                                <option key={index} value={f}>
                                                    {f}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <CustomizeRows onDataFromChild={handleDataFromChild} />
                                    {/* <ChildComponent onDataFromChild={handleDataFromChild} />
                                    {dataFromChild && <p>Received from child: {dataFromChild}</p>} */}
                                </div>
                                <div>
                                    <button style={{ position: 'absolute', top: '0', right: '0' }} className="bg-ghost-500 hover:bg-blue-200 text-black font-bold py-2 px-4 rounded" type="submit">
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
                                            <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </form>
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
