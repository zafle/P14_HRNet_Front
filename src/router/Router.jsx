import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'
import Layout from '../components/Layout/Layout'

const Home = lazy(() => import('../pages/Home/Home'))
const EditEmployee = lazy(() => import('../pages/EditEmployee/EditEmployee'))
const EmployeeList = lazy(() => import('../pages/EmployeeList/EmployeeList'))
const Error404 = lazy(() => import('../pages/Error404/Error404'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/edit-employee/:employeeId', element: <EditEmployee /> },
      { path: '/employee-list', element: <EmployeeList /> },
      { path: '*', element: <Error404 /> },
    ],
  },
])
