import React from 'react'
import Container
    from '../base/Container'
import ViewTaskManager from './TM/viewTaskManager'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../configurations/useAuth'
import Login from '../open/Login'

function Dashboard() {

    const { logOut, auth } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logOut()
        navigate("/login")
    }

    return (
        <div className="relative min-h-screen overflow-hidden text-white select-none">
            <img
                src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b"
                alt="bg"
                className="absolute w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl sm:text-5xl font-black tracking-tight select-none">
                            Task Manager
                        </h1>
                        <p className="text-white/70 mt-2 text-sm sm:text-base max-w-md mx-auto lg:mx-0 select-none">
                            Organize your workflow and manage tasks easily
                        </p>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto select-none'>
                        <Link to="/TM">
                            <button className="w-full px-5 py-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl hover:bg-white/20 active:scale-95 transition-all duration-300 shadow-xl">
                                View Tasks
                            </button>
                        </Link>

                        <Link to="/TM/add">
                            <button className="w-full px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-2xl">
                                + Add Task
                            </button>
                        </Link>
                        {
                            auth?.isLogin ?

                                <button
                                    onClick={handleLogout}
                                    className="w-full px-5 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-2xl"
                                >
                                    Logout
                                </button>

                                :

                                <Link to="/login">
                                    <button className="w-full px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-2xl">
                                        Login
                                    </button>
                                </Link>
                        }
                    </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 select-none">

                    <div className="rounded-3xl p-5 border border-white/10 bg-gradient-to-br from-cyan-500/30 to-blue-500/20 backdrop-blur-2xl shadow-2xl hover:scale-[1.02] transition-all duration-300 select-none">

                        <p className="text-white/70 text-xs sm:text-sm">
                            Total Tasks
                        </p>

                        <h2 className="text-3xl sm:text-4xl font-black mt-2">
                            254
                        </h2>

                    </div>

                    <div className="rounded-3xl p-5 border border-white/10 bg-gradient-to-br from-green-500/30 to-emerald-500/20 backdrop-blur-2xl shadow-2xl hover:scale-[1.02] transition-all duration-300 select-none">

                        <p className="text-white/70 text-xs sm:text-sm">
                            Completed
                        </p>

                        <h2 className="text-3xl sm:text-4xl font-black mt-2">
                            172
                        </h2>

                    </div>

                    <div className="rounded-3xl p-5 border border-white/10 bg-gradient-to-br from-yellow-500/30 to-orange-500/20 backdrop-blur-2xl shadow-2xl hover:scale-[1.02] transition-all duration-300 select-none">

                        <p className="text-white/70 text-xs sm:text-sm">
                            Incompleted
                        </p>

                        <h2 className="text-3xl sm:text-4xl font-black mt-2">
                            43
                        </h2>

                    </div>

                    <div className="rounded-3xl p-5 border border-white/10 bg-gradient-to-br from-pink-500/30 to-rose-500/20 backdrop-blur-2xl shadow-2xl hover:scale-[1.02] transition-all duration-300 select-none">

                        <p className="text-white/70 text-xs sm:text-sm">
                            Pending
                        </p>

                        <h2 className="text-3xl sm:text-4xl font-black mt-2">
                            39
                        </h2>

                    </div>

                </div>
                <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl overflow-hidden shadow-2xl select-none">
                    <div className="flex items-center justify-between p-5 border-b border-white/10">
                        <h2 className="text-xl font-bold">
                            Recent Tasks
                        </h2>
                        <span className="text-xs sm:text-sm text-white/60">
                            Last Updated Today
                        </span>
                    </div>
                    <div className="block lg:hidden p-4 space-y-4">
                        <div className="rounded-2xl bg-white/5 border border-white/10 p-4">

                            <div className="flex items-start justify-between gap-3">

                                <h3 className="font-semibold text-sm">
                                    Design Dashboard UI
                                </h3>

                                <span className="text-xs text-white/60">
                                    05 Feb 2026
                                </span>

                            </div>

                            <div className="flex gap-2 mt-4 flex-wrap">

                                <span className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-200">
                                    In Progress
                                </span>

                                <span className="px-3 py-1 text-xs rounded-full bg-pink-500/20 text-pink-200">
                                    High
                                </span>

                            </div>

                        </div>

                        <div className="rounded-2xl bg-white/5 border border-white/10 p-4">

                            <div className="flex items-start justify-between gap-3">

                                <h3 className="font-semibold text-sm">
                                    Fix API Validation
                                </h3>

                                <span className="text-xs text-white/60">
                                    07 Feb 2026
                                </span>

                            </div>

                            <div className="flex gap-2 mt-4 flex-wrap">

                                <span className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-200">
                                    Pending
                                </span>

                                <span className="px-3 py-1 text-xs rounded-full bg-pink-500/20 text-pink-200">
                                    Medium
                                </span>

                            </div>

                        </div>

                        <div className="rounded-2xl bg-white/5 border border-white/10 p-4">

                            <div className="flex items-start justify-between gap-3">

                                <h3 className="font-semibold text-sm">
                                    Deploy Backend
                                </h3>

                                <span className="text-xs text-white/60">
                                    01 Feb 2026
                                </span>

                            </div>

                            <div className="flex gap-2 mt-4 flex-wrap">

                                <span className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-200">
                                    Completed
                                </span>

                                <span className="px-3 py-1 text-xs rounded-full bg-pink-500/20 text-pink-200">
                                    Low
                                </span>

                            </div>

                        </div>
                    </div>
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-white/60 text-sm">
                                <tr>
                                    <th className="p-5">Task</th>
                                    <th className="p-5">Priority</th>
                                    <th className="p-5">Status</th>
                                    <th className="p-5">Due Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t border-white/10 hover:bg-white/5 transition">
                                    <td className="p-5 font-medium">
                                        Design Dashboard UI
                                    </td>
                                    <td className="p-5">
                                        <span className="px-3 py-1 rounded-full text-xs bg-red-500/20 text-red-200">
                                            High
                                        </span>
                                    </td>
                                    <td className="p-5">
                                        <span className="px-3 py-1 rounded-full text-xs bg-blue-500/20 text-blue-200">
                                            In Progress
                                        </span>
                                    </td>
                                    <td className="p-5">
                                        05 Feb 2026
                                    </td>
                                </tr>
                                <tr className="border-t border-white/10 hover:bg-white/5 transition">
                                    <td className="p-5 font-medium">
                                        Fix API Validation
                                    </td>
                                    <td className="p-5">
                                        <span className="px-3 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-200">
                                            Medium
                                        </span>
                                    </td>
                                    <td className="p-5">
                                        <span className="px-3 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-200">
                                            Pending
                                        </span>
                                    </td>
                                    <td className="p-5">
                                        07 Feb 2026
                                    </td>
                                </tr>
                                <tr className="border-t border-white/10 hover:bg-white/5 transition">
                                    <td className="p-5 font-medium">
                                        Deploy Backend
                                    </td>
                                    <td className="p-5">
                                        <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-200">
                                            Low
                                        </span>
                                    </td>
                                    <td className="p-5">
                                        <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-200">
                                            Completed
                                        </span>
                                    </td>
                                    <td className="p-5">
                                        01 Feb 2026
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard