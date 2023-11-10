import React, { useEffect, useState } from 'react'
import './../styles/home.module.css'

export default function Home() {
    return (
        <div className="relative flex flex-col justify-center overflow-hidden">
            <div className="w-full p-6 mx-auto my-10 rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
                <h1 className="text-xl font-semibold text-center">Login</h1>
                <form className="space-y-4">
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Email</span>
                        </label>
                        <input type="text" placeholder="Email Address" className="w-full input input-bordered" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Password</span>
                        </label>
                        <input type="password" placeholder="Enter Password" className="w-full input input-bordered" />
                    </div>
                    <div>
                        <button className="btn btn-block">Log In</button>
                    </div>
                    <span>New User?
                        <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline"> Sign Up</a></span>
                </form>
            </div>
        </div>
    )
}