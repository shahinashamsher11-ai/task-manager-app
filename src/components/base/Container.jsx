import React, { useEffect } from 'react'

function Container({ children, title = "" }) {
    useEffect(() => {
        if (title)
            document.title = "Coders Academy SMS - " + title
    }, [title])
    return (
        <div className='mt-0 p-4 w-full'>
            <div className='p-4 bg-blue-50 rounded-lg shadow-xl min-h-screen '>
                {children}
            </div>
        </div>
    )
}

export default Container