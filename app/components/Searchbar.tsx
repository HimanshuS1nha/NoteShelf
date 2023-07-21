"use client";

import { AiOutlineSearch } from 'react-icons/ai';
import { useState, useEffect } from 'react';

const Searchbar = ({ handleSearch }: { handleSearch: (query: string, type: string) => void }) => {
    const [query, setQuery] = useState("");
    const [type, setType] = useState("title")
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setQuery(e.target.value)
        if (query === '') {
            handleSearch(query, type);
        }
    }
    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setType(e.target.value)
    }

    useEffect(() => {
        if (query.length === 0) {
            handleSearch(query, type);
        }
    }, [query, handleSearch, type])

    return (
        <div className="flex justify-center">
            <select name="type" id="type" className="mx-3 rounded-md px-3 border-2 border-black" value={type} onChange={handleTypeChange}>
                <option value="title">Title</option>
                <option value="tag">Tag</option>
            </select>
            <input type="text" placeholder="Search a note" className="border-2 border-black p-3 rounded-full" value={query} onChange={handleChange} />
            <AiOutlineSearch size={23} className='relative -left-9 top-3.5 cursor-pointer' onClick={() => handleSearch(query, type)} />
        </div>
    )
}

export default Searchbar