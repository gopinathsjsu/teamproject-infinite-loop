"use client";

import Link from "next/link";
import useSession from "@/src/lib/useSession";
import useStore from "@/src/store";
import { apiLogoutUser } from "@/src/lib/auth-api";
import { useRouter } from "next/navigation";


export default function Navlinks() {
    const store = useStore();
    const user = useSession();
    const router = useRouter();

    const handleLogout = async () => {
        store.setRequestLoading(true);
        try {
            await apiLogoutUser();
        } catch (error) {
        } finally {
            store.reset();
            router.push("/login");
        }
    };

    return (
        <>
            {/* <li className="text-base mr-2"><Link href="/about">About Us</Link></li>
            <li className="text-base mr-2"><Link href="/contact">Contact Us</Link></li> */}
            {!user && (
                <>
                    <li>
                        <Link href="/signup" className="text-ct-dark-600">
                            Register
                        </Link>
                    </li>
                    <li>
                        <Link href="/login" className="text-ct-dark-600">
                            Login
                        </Link>
                    </li>
                </>
            )}
            {user && (
                <>
                    <li>
                        <Link href="/profile" className="text-ct-dark-600">
                            Profile
                        </Link>
                    </li>
                    <li className="cursor-pointer" onClick={handleLogout}>
                        Logout
                    </li>
                </>
            )}
        </>
    )
}