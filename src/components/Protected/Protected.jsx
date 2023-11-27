import React from 'react'
import { useSelector } from 'react-redux'
import { userSelect } from '../../redux/signupReducer'
import { Navigate } from 'react-router-dom'

const Protected = ({children}) => {
    const  user  = useSelector(userSelect)
    if(!user){
        return <Navigate to="/signup"/>
    }
  return children
}

export default Protected