"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { AiOutlinePlus } from "react-icons/ai";

const Navbar = () => {
    const { data } = useSession();
    const router = useRouter();
    const handleLogout = async () => {
        await signOut({ redirect: false });
        toast.success("Logged out successfully")
        router.refresh();
    }
    return (
        <nav className="flex justify-around items-center h-[80px] bg-[#1ABC9C]">
            <Link href={'/'}>
                <Image src={'/logo.webp'} width={90} height={80} alt="LOGO" className="h-[75px] w-24" />
            </Link>
            <ul className="flex gap-x-5">
                {!data?.user ? (
                    <>
                        <li>
                            <Link href={'/signup'} className="inline-block text-white hover:text-black font-bold py-2 px-4 rounded">
                                Signup
                            </Link>
                        </li>
                        <li>
                            <Link href={'/login'} className="bg-white inline-block text-black hover:bg-transparent border-2 border-transparent hover:border-white font-bold py-2 px-6 rounded-full">
                                Login
                            </Link>
                        </li>
                    </>) : (
                    <li>
                        <Link href={'/addnote'} className="bg-white inline-block text-black hover:opacity-75 font-bold py-2 px-6 rounded-full mx-2">
                            <span className="flex gap-x-2 items-center">Add Note <AiOutlinePlus size={20} /></span>
                        </Link>
                        <button className="bg-white inline-block text-black hover:opacity-75 font-bold py-2 px-6 rounded-full mx-2" onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default Navbar