"use client";

import { AiFillEdit, AiFillDelete, AiOutlineShareAlt } from 'react-icons/ai';
import Link from 'next/link';

import { NotesProps } from "@/types";

const Notes = ({ data, handleDelete, noteType }: NotesProps) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer my-3">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{data.title}</div>
                <p className="text-gray-700 text-base">
                    {data.description}
                </p>
            </div>
            <div className="px-6 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{data.tag}</span>
            </div>
            <div className='px-6 pb-2 flex gap-x-4'>
                <Link href={`/editnote/${data.id}`}><AiFillEdit size={20} className='hover:text-neutral-400' /></Link>
                <button onClick={() => handleDelete(data.id)}><AiFillDelete size={20} className='hover:text-neutral-400' /></button>
                {noteType === 'Your' && <Link href={`/sharenote/${data.id}`}><AiOutlineShareAlt size={20} className='hover:text-neutral-400' /></Link>}
            </div>
        </div>

    )
}

export default Notes