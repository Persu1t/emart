import React from 'react'
import { useSelector } from 'react-redux'
import { userSelect } from '../../redux/signupReducer'
import { Navigate } from 'react-router-dom'
import { googleSelect } from '../../redux/googleLoginReducer'

const Notuser = ({children}) => {
    let {user} = useSelector(userSelect)
    let {googleUser} = useSelector(googleSelect)
    // let user2 = useSelector(userSelect2)

    if(user !== null || googleUser !== null) {
       return <Navigate to="/"/>
    }
  return children
}

export default Notuser