import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <Navbar setIsOpen={setIsOpen} />
            <aside class={`fixed shadow-xl top-14 left-1 z-50 w-64 mb-5 mt-1 h-screen transition-transform sm:translate-x-0 ${isOpen ? "transform-none" : "-translate-x-full"}`}>
                <div class="h-full px-4 py-4 overflow-y-auto rounded  min-h-screen from-white via-sky-00/70 to-blue-100/70 shadow-sm">
                    <ul class="space-y-2 font-medium">
                        <li className="hover:bg-blue-100  rounded-xl" onClick={() => setIsOpen(false)}>
                            <Link to="/" class="flex items-center p-2 text-gray-700 rounded-lg">
                                <span class="ms-3">Dashboard</span>
                            </Link>
                        </li>
                         <li className="hover:bg-blue-100 rounded-xl" onClick={() => setIsOpen(false)}>
                            <Link to="/TM" class="flex items-center p-2 text-gray-700 rounded-lg">
                                <span class="ms-3">View Task</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default Sidebar