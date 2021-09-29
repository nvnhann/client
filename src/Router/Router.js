import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from '../pages/HomePage';
import DashBoard from '../pages/DashBoard';
import LoginForm from '../Component/Authentication/Login/LoginForm';
import User from '../pages/User';
import Author from 'src/pages/Author';

export default function Router() {
  const isAdmin = useSelector((state) => state.user.current.role) === 'ADMIN';
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="app" />,
    },
    {
      path: '/dashboard',
      element: isAdmin ? <DashBoard /> : <Navigate to="/" />,
      children: [
        {
          path: 'user',
          element: <User />,
        },
        {
          path: 'author',
          element: <Author />,
        },
      ],
    },
    {
      path: '/app',
      element: isAdmin ? <Navigate to="/dashboard" /> : <HomePage />,
      children: [
        {
          path: 'login',
          element: <LoginForm />,
        },
      ],
    },
  ]);
}
