import React from 'react'
import { FcAdvertising } from "react-icons/fc";
import { IoIosClose } from "react-icons/io";

function Toaster({ id, text, close }) {
    return (
        <div className="top-4 right-4 z-[999999] select-none">
            <div
                id={id}
                className="flex items-center w-full max-w-xs p-4 me-4 text-white rounded-2xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
                role="alert"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 pointer-events-none"></div>
                <div className="relative inline-flex items-center justify-center shrink-0 w-8 h-8 text-cyan-300 bg-cyan-500/20 border border-cyan-400/20 rounded-xl">
                    <FcAdvertising />
                </div>
                <div className="relative ms-3 text-sm font-normal text-white/80">
                    {text}
                </div>
                <button
                    onClick={() => close(id)}
                    className="relative ms-auto -mx-1.5 -my-1.5 z-40 hover:text-white rounded-xl hover:bg-red-500/20 border border-white/10 inline-flex items-center justify-center cursor-pointer h-8 w-8 transition-all duration-300"
                >
                    <IoIosClose className="text-2xl" />
                </button>
            </div>

        </div>
    )
}

export default Toaster