import { BrowserRouter, Route, Routes } from "react-router";
import Header from "../components/Header/Header";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" />
        <Route path="/employees-list" />
        <Route path="*" />
      </Routes>
    </BrowserRouter>
  )
}
export default Router