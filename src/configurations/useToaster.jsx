import React, { useContext, useState } from "react"
import Toaster from "../components/base/Toaster"

const createToaster = React.createContext()
const useToaster = () => useContext(createToaster)
const ToasterProvider = ({ children }) => {
    const [data, setData] = useState([])

    const open = (text) => {
        let id = Date.now()
        setData([...data, { id: id, text: text }])
        setTimeout(() => close(id), 5000)
    }

    const close = (id) => {
        setData(pev => pev.filter(item => item.id != id))
    }
    return (
        <createToaster.Provider value={{ open }}>
            {children}
            <div className="fixed space-y-2 bottom-4 right-4">
                {
                    data.map(item =>
                        <Toaster id={item.id} text={item.text} close={close} />
                    )
                }

            </div>
        </createToaster.Provider>)
}
export default useToaster
export { ToasterProvider }
