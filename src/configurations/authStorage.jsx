const storeAuth = (val) => {
    localStorage.setItem("taskmanager", JSON.stringify(val))
}

const getAuth = () => {
    return JSON.parse(localStorage.getItem("taskmanager"))
}

const clearAuth = () => {
    localStorage.clear("taskmanager")
}

export { storeAuth, getAuth, clearAuth }