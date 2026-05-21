import React from 'react'

function Card({ children}) {
    return (
        <div className='w-full'>
            <div className='bg-white border-violet-300 px-2 py-1 shadow-xl hover:shadow-blue-200 rounded-xl'>
                {children}
            </div>
           
        </div>

    )
}

export default Card