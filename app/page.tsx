"use client";

import { NoteType } from '@/types';
import Notes from './components/Notes'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Searchbar from './components/Searchbar';

export default function Home() {
  const { data } = useSession();
  const email = data?.user?.email;
  const [notes, setNotes] = useState<NoteType[]>([])
  const [allNotes, setAllNotes] = useState<NoteType[]>([])
  const [noteType, setNoteType] = useState("Your")
  const handleDelete = async (id: string) => {
    const confirmation = confirm("Are you sure you want to delete this note?");
    if (confirmation) {
      const response = await fetch('/api/deletenote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
      })
      const data = await response.json();
      if (data.success) {
        toast.success("Note deleted successfully")
        window.location = '/' as any;
      }
      else {
        toast.error("Some error occured. Please try again later!")
      }
    }
  }

  const handleSearch = async (query: string, type: string) => {
    if (query === '') {
      setAllNotes(notes)
      return;
    } else {
      if (type === 'title') {
        const newNotes = notes.filter((ele) => {
          return ele.title.toLowerCase().includes(query.toLowerCase())
        })
        setAllNotes(newNotes)
      } else {
        const newNotes = notes.filter((ele) => {
          return ele.tag.toLowerCase().includes(query.toLowerCase())
        })
        setAllNotes(newNotes)
      }
    }
  }
  useEffect(() => {
    const fetchAllNotes = async () => {
      const response = await fetch(`/api/fetchnotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(email)
      });
      const data = await response.json();
      if (data.success) {
        setNotes(data.notes);
        setAllNotes(data.notes)
      }
      else {
        toast.error("Some error occured. Please try again later!")
      }
    }
    const fetchSharedNotes = async () => {
      const response = await fetch(`/api/fetchsharednotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(email)
      });
      const data = await response.json();
      if (data.success) {
        setNotes(data.notes);
        setAllNotes(data.notes)
      }
      else {
        toast.error("Some error occured. Please try again later!")
      }
    }
    if (email) {
      if (noteType === 'Shared') {
        fetchSharedNotes();
      } else {
        fetchAllNotes();
      }
    }
  }, [email, noteType])
  return (
    <main className='mt-5'>
      <div className='flex justify-center mb-6 gap-x-6 items-center'>
        <button className={`${noteType === 'Your' ? 'text-2xl' : ''} ${noteType === 'Shared' ? 'hover:text-green-300' : ''} transition delay-75`} onClick={() => setNoteType('Your')}>Your Notes</button>
        <span>|</span>
        <button className={`${noteType === 'Shared' ? 'text-2xl' : ''} ${noteType === 'Your' ? 'hover:text-green-300' : ''} transition delay-75`} onClick={() => setNoteType('Shared')}>Shared Notes</button>
      </div>
      <Searchbar handleSearch={handleSearch} />
      <div className='flex gap-x-6 px-2 flex-wrap justify-center'>
        {noteType === 'Your' && email && allNotes.length !== 0 && allNotes.map((ele) => {
          return <Notes key={ele.id} data={ele} handleDelete={handleDelete} noteType="Your" />
        })}
      </div>

      <div className='flex gap-x-6 px-2 flex-wrap justify-center'>
        {noteType === 'Shared' && email && allNotes.map((ele) => {
          return <React.Fragment key={ele.id}>
            {ele.shared === email && <Notes data={ele} handleDelete={handleDelete} noteType='Shared' />}
          </React.Fragment>
        })}
      </div>

      {email && noteType !== 'Shared' && allNotes.length === 0 && (
        <p className='text-center text-red-400 font-semibold text-lg my-3'>No notes to display. Please add a note to view it here.</p>
      )}
      {!email && (
        <p className='text-center text-red-400 font-semibold text-lg my-3'>No notes to display. Please login to see your notes.</p>
      )}
    </main>
  )
}
