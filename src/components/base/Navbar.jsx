import React from 'react'

function Navbar({ setIsOpen }) {
    return (
        <div>
            <nav class="fixed top-0 z-50 w-full from-white via-sky-100/70 to-blue-100/70">
                <div class="px-3 py-3 lg:px-5 lg:pl-3">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center justify-start rtl:justify-end">
                            <button onClick={() => setIsOpen(pre => !pre)} class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100">
                                <span class="sr-only">Open Sidebar</span>
                            </button>
                            <span class="self-center text-xl font-bold sm:text-3xl whitespace-nowrap text-gray-900  ml-2">Task Manager</span>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar