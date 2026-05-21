import React, { useEffect, useState } from 'react'
import useToaster from '../../../configurations/useToaster'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'
import Card from '../../base/Card'
import Input from '../../base/Input'
import Model from '../../base/Model'
import { GoNumber } from "react-icons/go";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";
import { createAxios, createAxiosWithToken } from '../../../configurations/createAxios'
import useAuth from '../../../configurations/useAuth'


function EditTaskManager({ isOpen, setIsOpen, item, update }) {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToaster()
  const navigate = useNavigate()
  const { auth } = useAuth()

  const init = {
    id: "",
    taskName: "",
    description: "",
    isCompleted: 1,
  }
  const schema = yup.object().shape({
    taskName: yup.string().min(3, "taskName must be of 3 chars").max(20, "taskName must be under 20 chars").required("taskName is required"),
    description: yup.string().min(5, "Invalid").max(50, "Invalid").required("description is required"),
    isCompleted: yup.string().required("isCompleted is required")
  })
  const { handleBlur, handleChange, handleSubmit, touched, isValid, values, setValues, setFieldValue, errors } = useFormik({
    initialValues: init,
    validationSchema: schema,
    onSubmit(val) {
      editTask(val)
    }
  })
  useEffect(() => {
    if (item) {
      setValues({ ...item })
    }
  }, [item]);

  const editTask = (val) => {
    setIsLoading(true)
    createAxiosWithToken(auth.token).post("/TM/Update", val)
      .then(res => {
        let result = res.data
        toast.open("Updated!")
        navigate("/TM")
        setIsLoading(false)
        setIsOpen(false)
        update()

      }).catch(err => {
        setIsLoading(false)
        toast.open("you need to Login first!")
         navigate("/login")
      })
  }

  return (
    <Model title="Edit Task" isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="space-y-4 sm:space-y-5">
        <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-5'>
          <div className='flex flex-col'>
            <label className="mb-2 text-xs sm:text-sm font-medium text-white/80">
              Task Id
            </label>
            <Input
              id="id"
              name="id"
              value={values.id}
              Icons={<GoNumber />}
              IsError={touched.id && errors.id}
              placeholder="Enter task id"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {
              touched.id && errors.id &&
              <span className='text-xs sm:text-sm text-red-300 mt-1'>
                {errors.id}
              </span>
            }
          </div>
          <div className='flex flex-col'>
            <label className="mb-2 text-xs sm:text-sm font-medium text-white/80">
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
            {
              touched.taskName && errors.taskName &&
              <span className='text-xs sm:text-sm text-red-300 mt-1'>
                {errors.taskName}
              </span>
            }
          </div>
          <div className='flex flex-col'>
            <label className="mb-2 text-xs sm:text-sm font-medium text-white/80">
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
            {
              touched.description && errors.description &&
              <span className='text-xs sm:text-sm text-red-300 mt-1'>
                {errors.description}
              </span>
            }
          </div>
          <div className='flex flex-col'>
            <label className="mb-2 text-xs sm:text-sm font-medium text-white/80">
              Select Task
            </label>
            <select
              id="isCompleted"
              name="isCompleted"
              className='w-full rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl px-3 sm:px-4 py-3 text-xs sm:text-sm text-white shadow-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 hover:border-cyan-300/40'
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
            {
              touched.isCompleted && errors.isCompleted &&
              <span className='text-xs sm:text-sm text-red-300 mt-1'>
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
                    className='w-full py-3 rounded-2xl bg-gray-500/50 backdrop-blur-xl text-white text-sm sm:text-base font-semibold tracking-wide'
                  >
                    Updating...
                  </button>
                  :
                  <button
                    type="submit"
                    className='w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:scale-[1.01] active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.5)] text-sm sm:text-base font-semibold tracking-wide'
                  >
                    Update Task
                  </button>
                :
                <button
                  disabled
                  className='w-full py-3 rounded-2xl bg-white/10 text-white/50 border border-white/10 text-sm sm:text-base'
                >
                  Update Task
                </button>
            }
          </div>
        </form>
      </div>
    </Model>
  )
}

export default EditTaskManager