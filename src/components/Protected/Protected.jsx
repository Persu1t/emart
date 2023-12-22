import React from 'react';
import { useSelector } from 'react-redux';
import { userSelect } from '../../redux/signupReducer';
import { Navigate } from 'react-router-dom';
import { googleSelect } from '../../redux/googleLoginReducer';

const Protected = ({ children }) => {
  const { signedInWithEmail } = useSelector(userSelect);
  const { signedInWithGmail } = useSelector(googleSelect)

  if (signedInWithEmail === true || signedInWithGmail === true ) {
    // Redirect to signup page if not signed in with email or Google
    return children;
  }

  // Render children if signed in
  return <Navigate to="/signup" />;
};

export default Protected;
