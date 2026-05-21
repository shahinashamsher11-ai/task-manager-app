import React, { useEffect, useState } from 'react'
import useAuth from '../../configurations/useAuth'
import useToaster from '../../configurations/useToaster'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { createAxios } from '../../configurations/createAxios'
import { Navigate, useNavigate } from 'react-router-dom'

function Login({ isOpen, setIsOpen }) {
    const { logIn } = useAuth()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {
        document.title = "Task Manager - Login"
    }, [])

    const toast = useToaster()
    const schema = yup.object().shape({
        UserName: yup.string().required("User Name is required."),
        Password: yup.string().required("Password is required.")
    })

    const { handleSubmit, handleChange, handleBlur, errors, touched, isValid } = useFormik({
        initialValues: {
            UserName: "",
            Password: ""
        },
        validationSchema: schema,
        onSubmit(val) {
            callLogin(val)
        }
    })

    const callLogin = (val) => {
        setLoading(true)
        createAxios.post("/ApplicationUser/Authenticate", val)
            .then(res => {
                let data = res.data
                if (data.result.isSuccess) {
                    logIn({
                        isLogin: true,
                        token: data.token,
                        UserName: data.userName
                    })
                    toast.open("Welcome to my project!")
                    navigate("/")
                }
                else {
                    toast.open("Incorrect Username or Password!")
                }
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                toast.open("Check your Internet Connection")
            })
    }
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-6 select-none">
            <img
                src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b"
                alt="bg"
                className="absolute w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
            <form
                onSubmit={handleSubmit}
                className="relative backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-6 sm:p-8 w-full max-w-sm text-white"
            >
                <div className="absolute top-3 right-3 cursor-pointer text-white/60 hover:text-white hover:bg-white/10 w-8 h-8 flex items-center justify-center rounded-xl transition
                 duration-300"  onClick={() => navigate("/")}>
                    ✕
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 tracking-wide">
                    Login
                </h2>
                <div className="mb-4">
                    <label className="block text-sm mb-1 text-white/80">
                        Username
                    </label>
                    <input
                        type="text"
                        name="UserName"
                        placeholder="Enter user name"
                        className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/10 placeholder-white/50 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-cyan-400/30 focus:border-cyan-400/30 transition"
                        IsError={touched.UserName && errors.UserName ? true : false}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {
                        touched.UserName &&
                        <span className='text-xs sm:text-sm text-red-300'>
                            {errors.UserName}
                        </span>
                    }
                </div>
                <div className="mb-3">
                    <label className="block text-sm mb-1 text-white/80">
                        Password
                    </label>
                    <input
                        type="password"
                        name="Password"
                        placeholder="Enter password"
                        className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/10 placeholder-white/50 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-cyan-400/30 focus:border-cyan-400/30 transition"
                        IsError={touched.Password && errors.Password ? true : false}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {
                        touched.Password &&
                        <span className='text-xs sm:text-sm text-red-300'>
                            {errors.Password}
                        </span>
                    }
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm mb-5 gap-2 text-white/70">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="remember" className="accent-cyan-400" />
                        Remember me
                    </label>
                    <span className="cursor-pointer hover:text-white hover:underline transition">
                        Forgot?
                    </span>
                </div>
                <div>
                    {
                        loading ?
                            <button
                                type="submit"
                                className="w-full py-3 rounded-2xl bg-white/10 border border-white/10 text-white/60 text-sm sm:text-base"
                            >
                                Logging in...
                            </button>
                            :
                            <button
                                type="submit"
                                className={`w-full py-3 rounded-2xl text-sm sm:text-base font-semibold transition-all duration-300 ${isValid ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] active:scale-95 shadow-xl' : 'bg-white/10 text-white/40 cursor-not-allowed'}`} disabled={!isValid}
                            >
                                Login
                            </button>
                    }
                </div>
                <p className="text-center text-xs sm:text-sm mt-5 text-white/70">
                    Don't have an account?{" "}
                    <span className="underline cursor-pointer hover:text-white transition">
                        Register
                    </span>
                </p>
            </form>
        </div>
    )
}

export default Login