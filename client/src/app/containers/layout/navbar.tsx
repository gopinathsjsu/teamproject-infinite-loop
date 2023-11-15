'use client'
import Link from 'next/link'
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon'
import Navlinks from './navlinks'
import { themeChange } from 'theme-change';
import { useEffect, useState } from 'react'
import MoonIcon from '@heroicons/react/24/outline/MoonIcon'
import SunIcon from '@heroicons/react/24/outline/SunIcon'

export default function Navbar() {
    // const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme"))
    const [currentTheme, setCurrentTheme] = useState<string | null>(null);
    const logoutUser = () => {

    }

    useEffect(() => {
        themeChange(false)
        console.log(currentTheme)
        if (currentTheme === null) {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: business)').matches) {
                setCurrentTheme("business")
            } else {
                setCurrentTheme("pastel")
            }
        }
    }, [])


    return (
        <div className="w-full flex justify-center  shadow-md  text-primary-content bg-primary">
            <div className="navbar  max-w-5xl">
            <div className="flex-none lg:hidden">
                    <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                        <Bars3Icon className="h-5 inline-block w-5" />
                    </label>
                </div>
                
                <div className="flex-1 px-2 mx-2">
                    <Link href="/">
                        <span className='font-bold text-xl'>
                            <img className="mask inline-block mr-2 mask-circle w-10" src="/android-chrome-192x192.png" /> Box Office
                        </span>
                    </Link>
                </div>

                {/* Static search box */}
                <div className="flex-1 px-2 mx-2">
                    <input type="text" placeholder="Search..." className="input input-bordered w-full max-w-xs lg:max-w-md" />
                </div>
                <div className="flex-none hidden lg:block">
                    <ul className="menu menu-horizontal">
                        <Navlinks />
                    </ul>


                    <label className="swap ">
                        <input type="checkbox" />
                        <SunIcon data-set-theme="pastel" data-act-class="ACTIVECLASS" className={"fill-current w-5 h-5 " + (currentTheme === "business" ? "swap-on" : "swap-off")} />
                        <MoonIcon data-set-theme="business" data-act-class="ACTIVECLASS" className={"fill-current w-5 h-5 " + (currentTheme === "pastel" ? "swap-on" : "swap-off")} />
                    </label>

                    <div className="dropdown ml-6 dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-6 rounded-full">
                                <img src="https://placeimg.com/80/80/people" alt="profile" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100  rounded-box w-52">
                            <li className="justify-between">
                                <Link href={'/app/settings-profile'}>
                                    Settings
                                </Link>
                            </li>
                            <li className="justify-between">
                                <Link href={'/personal_profile'}>
                                    Profile
                                </Link>
                            </li>
                            <li className="justify-between">
                                <Link href={'/purchases'}>
                                    Purchases
                                </Link>
                            </li>
                            <div className="divider mt-0 mb-0"></div>
                            <li><a onClick={logoutUser}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}