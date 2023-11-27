import React from 'react'
import { useSelector } from 'react-redux'
import { userSelect } from '../../redux/signupReducer'
import { Navigate } from 'react-router-dom'

const Notuser = ({children}) => {
    let user = useSelector(userSelect)

    if(user){
       return <Navigate to="/"/>
    }
  return children
}

export default Notuser