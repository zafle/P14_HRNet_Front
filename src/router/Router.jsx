import { BrowserRouter, Route, Routes } from 'react-router'
import Header from '../components/Header/Header'
import Home from '../pages/Home/Home'

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employees-list" />
        <Route path="*" />
      </Routes>
    </BrowserRouter>
  )
}
export default Router
