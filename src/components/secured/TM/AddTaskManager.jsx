import React, { useState } from 'react'
import Container from '../../base/Container'
import useToaster from '../../../configurations/useToaster'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'
import Card from '../../base/Card'
import Input from '../../base/Input'
import { IoIosArrowBack } from "react-icons/io";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";
import { createAxios, createAxiosWithToken } from '../../../configurations/createAxios'
import useAuth from '../../../configurations/useAuth'

// const a = b => 20 + b
// function fun(x) {
//   return x + 20

// }
// console.log(a(50))
// console.log(fun(50))


function AddTaskManager() {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToaster()
  const navigate = useNavigate()
  const { auth } = useAuth()

  const init = {
    taskName: "",
    description: "",
    isCompleted: 1
  }
  const schema = yup.object().shape({
    taskName: yup.string().min(3, "Task Name must be of 3 chars").max(20, "Task Name must be under 20 chars").required("Task Name is required."),
    description: yup.string().min(5, "Description must be at least 5 characters").max(50, "Description must be under 50 characters").required("Description is required."),
    isCompleted: yup.string().required("IsCompleted is required.")
  })
  const { handleBlur, handleChange, handleSubmit, touched, isValid, values, errors, setFieldValue } = useFormik({
    initialValues: init,
    validationSchema: schema,
    onSubmit(val) {
      addTask(val)
    }
  })


  const addTask = (val) => {
    setIsLoading(true)
    createAxiosWithToken(auth.token).post("/TM/Add", val)
      .then(res => {
        let result = res.data
        toast.open("Added!")
        navigate(-1)
        setIsLoading(false);
      }).catch((err) => {
        setIsLoading(false)
        toast.open("you need to Login first!");
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
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className='flex items-center gap-3 mb-6'>
          <button
            className='w-12 h-12 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl flex items-center justify-center text-2xl text-white cursor-pointer hover:bg-white/20 hover:scale-105 transition-all duration-300'
            onClick={() => navigate(-1)}
          >
            <IoIosArrowBack />
          </button>
          <div>
            <h2 className='text-2xl sm:text-3xl font-black tracking-tight select-none'>
              Add New Task
            </h2>
            <p className='text-white/60 text-sm mt-1 select-none'>
              Create and manage your task easily
            </p>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 select-none"></div>
          <div className="p-5 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5 select-none">
              <div className='flex flex-col'>
                <label className="mb-2 text-sm font-medium text-white/80 select-none">
                  Task Name
                </label>
                <Input
                  id="taskName"
                  name="taskName"
                  Icons={<MdDriveFileRenameOutline />}
                  value={values.taskName}
                  IsError={touched.taskName && errors.taskName}
                  placeholder="Enter Task Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.taskName && errors.taskName &&
                  <span className='text-sm text-red-300 mt-1 select-none'>
                    {errors.taskName}
                  </span>
                }
              </div>
              <div className='flex flex-col'>
                <label className="mb-2 text-sm font-medium text-white/80 select-none">
                  Description
                </label>
                <Input
                  id="description"
                  name="description"
                  Icons={<TbFileDescription />}
                  value={values.description}
                  IsError={touched.description && errors.description}
                  placeholder="Enter description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.description && errors.description &&
                  <span className='text-sm text-red-300 mt-1 select-none'>
                    {errors.description}
                  </span>
                }
              </div>
              <div className='flex flex-col'>
                <label className="mb-2 text-sm font-medium text-white/80 select-none">
                  Select Task
                </label>
                <select
                  id="isCompleted"
                  name="isCompleted"
                  className='w-full rounded-2xl border border-white/10 bg-white/10 backdrop-blur-2xl px-4 py-3 text-sm text-white shadow-2xl outline-none focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10 transition-all duration-300'
                  value={values.isCompleted}
                  onChange={(e) =>
                    setFieldValue("isCompleted", Number(e.target.value))
                  }
                  onBlur={handleBlur}
                >
                  <option className='text-black' value={1}>
                    Completed Task
                  </option>

                  <option className='text-black' value={0}>
                    Incompleted Task
                  </option>
                </select>

                {touched.isCompleted && errors.isCompleted &&
                  <span className='text-sm text-red-300 mt-1 select-none'>
                    {errors.isCompleted}
                  </span>
                }
              </div>
              <div className='pt-2'>
                {
                  isValid ?
                    isLoading ?
                      <button
                        disabled
                        className='w-full py-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl text-white/70 font-semibold'
                      >
                        Saving...
                      </button>
                      :
                      <button
                        type="submit"
                        className='w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.01] active:scale-95 transition-all duration-300 shadow-2xl font-semibold'
                      >
                        Save Task
                      </button>
                    :
                    <button
                      disabled
                      className='w-full py-3 rounded-2xl bg-white/10 text-white/50 border border-white/10 backdrop-blur-xl'
                    >
                      Save Task
                    </button>
                }
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddTaskManager