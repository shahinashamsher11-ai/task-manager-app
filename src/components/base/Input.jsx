import React from 'react'

function Input(props) {
    const { Icons, IsError } = props
    return (
        <div>
            <div>
                <div class="relative w-full">
                    {
                        Icons &&
                        <div class="absolute inset-y-0 start-0 flex items-center ps-4 text-white/50 pointer-events-none">
                            {Icons}
                        </div>
                    }
                    <input
                        {...props}
                        className={`outline-none 
                    ${IsError
                                ? "border-red-500/50 focus:ring-red-400/20"
                                : "border-white/10 focus:border-cyan-400/30 focus:ring-cyan-400/10"
                            } 
                    bg-white/10 backdrop-blur-2xl border shadow-2xl mt-1 text-white placeholder:text-white/40 text-sm rounded-2xl block w-full 
                    ${Icons && "ps-11"} 
                    p-3 hover:bg-white/15 transition-all duration-300 focus:ring`}
                    />
                </div>
            </div>
        </div>
    )
}

export default Input