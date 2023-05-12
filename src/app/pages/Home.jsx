import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLocalUser } from '../store/slices/AuthSlice'

const Home = () => {
    const { userData } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getLocalUser())
    }, [])
    return (
        <div>Home {userData?.name}</div>
    )
}

export default Home