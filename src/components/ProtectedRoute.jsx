import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Outlet, Navigate } from 'react-router-dom'
import { getProfile } from '../apis';
import { setIsAdmin } from '../facilities/commonSlice';
import { toast } from 'react-hot-toast';


const ProtectedRoute = ({ children }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAdmin, isAuthenticated } = useSelector((state) => state.common);


    const fetchProfile = async () => {
        try {
            console.log('fetch')
            const { data } = await axios.get(getProfile(), { withCredentials: true });
            if (data.user.role !== 'admin') {
                console.log(data.user.role)
                navigate('/')
            }
        } catch (error) {
            toast.error(error.response.data.message);
            navigate('/login');
        }
    }
    useEffect(() => {

        console.log('hello')
        if (isAuthenticated === null || isAdmin === null) {
            fetchProfile();
        }
        else if (!isAuthenticated) {
            toast.error('Login First')
            navigate('/login')
        }
        else if (!isAdmin) {
            navigate('/')
        }
    }, [])

    return (
        children ? children : <Outlet />
    )
}

export default ProtectedRoute