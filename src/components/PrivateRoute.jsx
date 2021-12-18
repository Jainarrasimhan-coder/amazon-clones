import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const navigate=useNavigate();
    const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return userInfo ? children : navigate('/signin')
}
export default PrivateRoute;
