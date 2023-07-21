"use client";

import { ParamsProps } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import { toast } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";

const ShareNote = ({ params }: ParamsProps) => {
    const [note, setNote] = useState({ title: "", description: "", tag: "", shared: "" })
    const [captcha, setCaptcha] = useState(false)
    const router = useRouter();
    const { id } = params;
    const { data: session } = useSession();

    const onChange = () => {
        setCaptcha(true);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNote((prev) => {
            return { ...prev, shared: e.target.value }
        })
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (session?.user?.email === note.shared) {
            return toast.error("You cannot share the note without yourself as you are the owner")
        }
        const response = await fetch('/api/sharenote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, note })
        });
        const data = await response.json();
        if (data.success) {
            toast.success("Note shared successfully");
            setTimeout(() => {
                router.push('/');
            }, 1500);
        } else {
            toast.error(data.message)
        }
    }

    useEffect(() => {
        const fetchNote = async () => {
            const response = await fetch('/api/fetchnote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(id)
            });
            const data = await response.json();
            if (data.success) {
                setNote(data.note)
            } else {
                toast.error("Some error occured. Please try again!")
            }
        }
        if (session?.user) {
            fetchNote();
        } else {
            router.push('/login')
        }
    }, [id])

    return (
        <div className="p-10">
            <p className='text-center text-2xl font-semibold'>Share note</p>
            <p className="mb-6 text-red-500 text-sm text-center">If you share your notes with someone, they can edit and delete them</p>
            <form onSubmit={handleSubmit} autoComplete="off">
                <div className="mb-6">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Note Title</label>
                    <input type="text" name="title" id="title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Note Title" required value={note.title} readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <input type="text" name="description" id="description" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Description" required value={note.description} readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="tag" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tag</label>
                    <input type="text" name="tag" id="tag" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Tag" required value={note.tag} readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="tag" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Share To</label>
                    <input type="text" name="tag" id="tag" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter email of the person to share" required value={note.shared} onChange={handleChange} />
                </div>
                <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                    onChange={onChange}
                />
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-blue-300" disabled={!captcha}>Share Note</button>
            </form>
        </div>
    )
}

export default ShareNote