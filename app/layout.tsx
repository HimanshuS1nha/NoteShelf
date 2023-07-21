import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import NextAuthProvider from './components/NextAuthProvider'
import ToastProvider from './components/ToastProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NoteShelf',
  description: "NoteShelf is a powerful and intuitive note-taking app that helps you capture and organize your ideas, tasks, and important information. Stay productive and never forget a thing with NoteShelf's sleek design, collaboration features, and seamless synchronization across devices. Start taking notes with ease today!",
  keywords: [
    "note-taking app",
    "note organizer",
    "productivity tool",
    "task management",
    "digital notes",
    "collaboration",
    "synchronized notes",
    "idea capture",
    "information management"
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider />
        <NextAuthProvider>
          <Navbar />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
