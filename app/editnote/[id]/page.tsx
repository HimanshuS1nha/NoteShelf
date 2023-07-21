"use client";

import { ParamsProps } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-hot-toast";

const EditNote = ({ params }: ParamsProps) => {
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const [captcha, setCaptcha] = useState(false)
    const { data } = useSession();
    const router = useRouter();
    const { id } = params;
    const onChange = () => {
        setCaptcha(true)
    }
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNote((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/editnote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, note })
        });
        const data = await response.json();
        if (data.success) {
            toast.success("Note updated successfully");
            setTimeout(() => {
                router.push('/');
            }, 1500);
        } else {
            toast.error("Some error occured. Please try again!")
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
        if (data?.user) {
            fetchNote();
        } else {
            router.push('/login')
        }
    }, [id])

    return (
        <div className="p-10">
            <p className='text-center text-2xl font-semibold mb-6'>Edit note</p>
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Note Title</label>
                    <input type="text" name="title" id="title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Note Title" required value={note.title} onChange={handleChange} />
                </div>
                <div className="mb-6">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <input type="text" name="description" id="description" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Description" required value={note.description} onChange={handleChange} />
                </div>
                <div className="mb-6">
                    <label htmlFor="tag" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tag</label>
                    <input type="text" name="tag" id="tag" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Tag" required value={note.tag} onChange={handleChange} />
                </div>
                <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                    onChange={onChange}
                />
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-blue-300" disabled={!captcha}>Update Note</button>
            </form>
        </div>
    )
}

export default EditNote