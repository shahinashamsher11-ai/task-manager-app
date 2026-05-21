import React, { useEffect, useState } from 'react'
import Container from '../../base/Container'
import axios from 'axios'
import Model from '../../base/Model'
import useToaster from '../../../configurations/useToaster'
import EditTaskManager from './EditTaskManager'
import moment from 'moment'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import { createAxios, createAxiosWithToken } from '../../../configurations/createAxios'
import useAuth from '../../../configurations/useAuth'


function ViewTaskManager() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [isRefresh, setIsRefresh] = useState(false)
    const [deleteId, setIsDeleteId] = useState("")
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [itemData, setItemData] = useState()
    const toast = useToaster()
    const navigate = useNavigate()
    const [filterLoading, setFilterLoading] = useState(false)
    const { auth } = useAuth()


    useEffect(() => { getTask(); }, [])

    const getTask = () => {
        setIsLoading(true)
        createAxios.get(`/TM/GetAll`)
            .then(res => {
                let result = res.data.data
                setData(result)
                setIsLoading(false)
                setIsRefresh(false)
            })
            .catch(err => {
                toast.open("Check your Internet Connection")
                setIsRefresh(true)
                setIsLoading(false)
            })
    }
    const handleDelete = () => {
        setIsLoading(true);
        createAxiosWithToken(auth.token).post(`/TM/Remove?Id=${deleteId}`)
            .then(res => {
                let result = res.data
                toast.open("Task deleted successfully");
                setIsLoading(false);
                setIsDeleteOpen(false)
                getTask();
            }).catch(err => {
                toast.open("you need to Login first!");
                setIsLoading(err.message)
                navigate("/login")

            });

    };

    const handleGetAllCompleted = () => {
        setFilterLoading(true);
        createAxiosWithToken(auth.token).get("/TM/GetAllCompletedTask")
            .then((res) => {
                setData(res.data.data);
                toast.open("Completed Task");
                setFilterLoading(false);
            })
            .catch((err) => {
                toast.open("you need to Login first!");
                setFilterLoading(false)
            })
    }

    const handleGetAllInCompleted = () => {
        setFilterLoading(true);
        createAxiosWithToken(auth.token).get("/TM/GetInCompletedTask")
            .then((res) => {
                setData(res.data.data);
                toast.open("Incompleted Task");
                setFilterLoading(false);
            })
            .catch((err) => {
                toast.open("you need to Login first!");
                setFilterLoading(false)
            })
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
                    <div>
                        <h1
                            className='flex items-center gap-3 text-3xl sm:text-4xl font-black tracking-tight cursor-pointer'
                            onClick={() => navigate(-1)}
                        >
                            <span className='p-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl hover:bg-white/20 transition-all duration-300'>
                                <IoIosArrowBack />
                            </span>
                            My Task List
                        </h1>
                        <p className="text-white/70 mt-2 text-sm sm:text-base">
                            Manage and organize all your tasks easily
                        </p>
                    </div>
                    <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto'>
                        <Link
                            className='px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-2xl text-center'
                            to="/TM/add"
                        >
                            + Add New
                        </Link>
                        <button
                            className='px-5 py-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl hover:bg-white/20 active:scale-95 transition-all duration-300 shadow-xl'
                            onClick={getTask}
                        >
                            Get All
                        </button>
                        <button
                            className='px-5 py-3 rounded-2xl bg-green-500/20 border border-green-400/20 backdrop-blur-xl hover:bg-green-500/30 active:scale-95 transition-all duration-300 shadow-xl'
                            onClick={handleGetAllCompleted}
                            disabled={filterLoading}
                        >
                            Completed
                        </button>
                        <button
                            className='px-5 py-3 rounded-2xl bg-red-500/20 border border-red-400/20 backdrop-blur-xl hover:bg-red-500/30 active:scale-95 transition-all duration-300 shadow-xl'
                            onClick={handleGetAllInCompleted}
                            disabled={filterLoading}
                        >
                            Incompleted
                        </button>
                    </div>
                </div>
                {isLoading ?
                    <div className='flex items-center justify-center py-32'>
                        <div className='rounded-3xl bg-white/10 border border-white/10 backdrop-blur-2xl px-10 py-8 shadow-2xl text-center'>
                            <h1 className='text-xl font-semibold text-white/90 mb-2'>
                                Please Wait...
                            </h1>
                            <p className='text-white/60 text-sm'>
                                Data is loading...
                            </p>
                        </div>
                    </div>
                    :
                    <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl overflow-hidden shadow-2xl">
                        <div className="flex items-center justify-between p-5 border-b border-white/10">
                            <h2 className="text-xl font-bold">
                                All Tasks
                            </h2>
                            <span className="text-xs sm:text-sm text-white/60">
                                Updated Recently
                            </span>
                        </div>
                        <div className="block lg:hidden p-4 space-y-4">
                            {isRefresh ?
                                <div className="text-center">
                                    <button
                                        className='px-5 py-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl hover:bg-white/20 transition-all duration-300'
                                        onClick={getTask}
                                    >
                                        Refresh
                                    </button>
                                </div>
                                :
                                data.map((item, index) =>
                                    <div
                                        key={index}
                                        className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-xl"
                                    >
                                        <div className='flex items-start justify-between gap-3'>
                                            <div>
                                                <h3 className='font-semibold text-base'>
                                                    {item.taskName}
                                                </h3>
                                                <p className='text-white/60 text-sm mt-1'>
                                                    {item.description}
                                                </p>
                                            </div>
                                            <span className='text-xs text-white/60 whitespace-nowrap'>
                                                {moment(item.createdOn).format("DD-MM-YYYY")}
                                            </span>
                                        </div>
                                        <div className='flex flex-wrap gap-2 mt-4'>
                                            <span className={`px-3 py-1 text-xs rounded-full 
                                        ${item.isCompleted
                                                    ? "bg-green-500/20 text-green-200"
                                                    : "bg-red-500/20 text-red-200"}`}>
                                                {item.isCompleted ? "Completed" : "InCompleted"}
                                            </span>
                                        </div>
                                        <div className='flex gap-3 mt-5'>
                                            <button
                                                className="flex-1 py-2 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 transition-all duration-300"
                                                onClick={() => {
                                                    setItemData(item);
                                                    setIsEditOpen(true)
                                                }}
                                            >
                                                <div className='flex items-center justify-center gap-2'>
                                                    <FaEdit />
                                                    Edit
                                                </div>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIsDeleteId(item.id)
                                                    setIsDeleteOpen(true)
                                                }}
                                                className="flex-1 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-200 transition-all duration-300"
                                            >
                                                <div className='flex items-center justify-center gap-2'>
                                                    <MdDelete />
                                                    Delete
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div className="hidden lg:block overflow-x-auto">
                            <table className="w-full text-left text-white">
                                <thead className="bg-white/5 text-white/60 text-sm">
                                    <tr>
                                        <th className="p-5">Task No.</th>
                                        <th className="p-5">Task Name</th>
                                        <th className="p-5">Description</th>
                                        <th className="p-5">Status</th>
                                        <th className="p-5">Date</th>
                                        <th className="p-5">Edit/Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isRefresh ?
                                        <tr>
                                            <td colSpan="6" className="text-center p-8">
                                                <button
                                                    className='px-5 py-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl hover:bg-white/20 transition-all duration-300'
                                                    onClick={getTask}
                                                >
                                                    Refresh
                                                </button>
                                            </td>
                                        </tr>
                                        :
                                        data.map((item, index) =>
                                            <tr
                                                key={index}
                                                className="border-t border-white/10 hover:bg-white/5 transition-all duration-300"
                                            >
                                                <td className="p-5 font-medium">
                                                    {item.id}
                                                </td>
                                                <td className="p-5 font-medium">
                                                    {item.taskName}
                                                </td>
                                                <td className="p-5 text-white/70 max-w-sm">
                                                    {item.description}
                                                </td>
                                                <td className="p-5">
                                                    <span className={`px-3 py-1 rounded-full text-xs
                                                ${item.isCompleted
                                                            ? "bg-green-500/20 text-green-200"
                                                            : "bg-red-500/20 text-red-200"}`}>

                                                        {item.isCompleted ? "Completed" : "InCompleted"}
                                                    </span>
                                                </td>
                                                <td className="p-5 text-white/70">
                                                    {moment(item.createdOn).format("DD-MM-YYYY")}
                                                </td>
                                                <td className="p-5">
                                                    <div className="flex gap-3">
                                                        <button
                                                            className="w-10 h-10 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 flex items-center justify-center transition-all duration-300"
                                                            onClick={() => {
                                                                setItemData(item);
                                                                setIsEditOpen(true)
                                                            }}
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setIsDeleteId(item.id)
                                                                setIsDeleteOpen(true)
                                                            }}
                                                            className="w-10 h-10 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 flex items-center justify-center transition-all duration-300"
                                                        >
                                                            <MdDelete />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
                <Model title="Delete Task" isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen}>
                    <div className='my-6 mx-2 text-center text-white'>
                        <h1 className='text-2xl font-bold mb-3'>
                            Delete Task?
                        </h1>
                        <p className='text-white/60 mb-6'>
                            Are you sure you want to delete this task permanently?
                        </p>
                        <div className='flex gap-3'>
                            {isLoading ?
                                <button
                                    disabled
                                    className='w-full py-3 rounded-2xl bg-white/20'
                                >
                                    Deleting...
                                </button>
                                :
                                <button
                                    className='w-full py-3 rounded-2xl bg-red-500 hover:bg-red-600 transition-all duration-300'
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            }
                            <button
                                className='w-full py-3 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300'
                                onClick={() => setIsDeleteOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </Model>
                <EditTaskManager
                    isOpen={isEditOpen}
                    setIsOpen={setIsEditOpen}
                    item={itemData}
                    update={getTask}
                />
            </div>
        </div>
    )
}

export default ViewTaskManager