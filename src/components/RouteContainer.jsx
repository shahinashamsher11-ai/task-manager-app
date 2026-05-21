import React from 'react'
import Dashboard from './secured/Dashboard'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AddTaskManager from './secured/TM/AddTaskManager'
import ViewTaskManager from './secured/TM/viewTaskManager'
import EditTaskManager from './secured/TM/EditTaskManager'
import Login from './open/Login'
import useAuth from '../configurations/useAuth'

function RouteContainer() {

    const { auth } = useAuth()

    return (
        <BrowserRouter>
            <Routes>

                <Route path='/' element={<Dashboard />} />

                <Route path='/TM' element={<ViewTaskManager />} />

                <Route
                    path='/TM/add'
                    element={auth?.isLogin ? <AddTaskManager /> : <Navigate to="/login" replace />}
                />

                <Route
                    path='/TM/update'
                    element={auth?.isLogin ? <EditTaskManager /> : <Navigate to="/login" replace />}
                />

                <Route path='*' element={<Navigate to="/" replace />} />
                <Route path='/login' element={<Login />} />

            </Routes>
        </BrowserRouter>
    )
}

export default RouteContainer