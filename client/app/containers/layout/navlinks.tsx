import Link from 'next/link'
export default function Navlinks(){
    return(
        <>
            <li className="text-base mr-2"><Link href="/about">About Us</Link></li>
            <li className="text-base mr-2"><Link href="/contact">Contact Us</Link></li>
        </>
    )
}