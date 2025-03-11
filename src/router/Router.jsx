import { BrowserRouter, Route, Routes } from 'react-router'
import Header from '../components/Header/Header'
import Home from '../pages/Home/Home'
import EmployeeList from '../pages/EmployeeList/EmployeeList'

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="*" />
      </Routes>
    </BrowserRouter>
  )
}
export default Router
