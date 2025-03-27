import { createBrowserRouter } from 'react-router'
import Layout from '../components/Layout/Layout'
import Home from '../pages/Home/Home'
import EditEmployee from '../pages/EditEmployee/EditEmployee'
import EmployeeList from '../pages/EmployeeList/EmployeeList'
import Error404 from '../pages/Error404/Error404'

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
