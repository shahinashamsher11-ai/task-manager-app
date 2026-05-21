import React from 'react'
import { IoClose } from "react-icons/io5";

function Model({ title, children, isOpen, setIsOpen }) {

    return (
        <>
            <div class={`${!isOpen && "hidden"} flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[999999] justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div class="relative p-4 w-full max-w-xl max-h-full">
                    <div class="relative rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.45)] overflow-hidden">
                        <div className='absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 pointer-events-none'></div>
                        <div class="relative flex items-center justify-between p-4 md:p-5 border-b border-white/10">
                            <h3 class="text-xl font-bold text-white tracking-wide">
                                {title}
                            </h3>
                            <button
                                onClick={() => setIsOpen(pre => !pre)}
                                type="button"
                                class="text-white/60 bg-white/5 hover:bg-red-500/20 hover:text-white border border-white/10 rounded-2xl text-sm w-10 h-10 ms-auto inline-flex justify-center items-center transition-all duration-300"
                            >
                                <IoClose className='text-xl' />
                            </button>
                        </div>
                        <div class="relative p-4 md:p-5 space-y-4 text-white/80">
                            {children}
                        </div>
                    </div>
                </div>
            </div>

            {isOpen &&
                <div
                    onClick={() => setIsOpen(pre => !pre)}
                    className='bg-black/60 backdrop-blur-sm fixed inset-0 z-[99999]'
                >
                </div>
            }

        </>
    )
}

export default Model