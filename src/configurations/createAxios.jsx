import axios from "axios";

export const createAxios = axios.create({
    baseURL: "https://localhost:7138/api"
})

export const createAxiosWithToken = (token) => axios.create({
    baseURL: "https://localhost:7138/api",
    headers: {
        Authorization:`Bearer ${token}`
    }
})
// export const createAxios = axios.create({
//     baseURL: "https://corset-nickname-banker.ngrok-free.dev/api"
// })
// export const createAxiosWithToken = (token) => axios.create({
//     baseURL: "https://corset-nickname-banker.ngrok-free.dev/api",
//     headers: {
//         Authorization:`Bearer ${token}`
//     }
// })