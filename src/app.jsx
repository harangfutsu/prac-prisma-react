import { Routes, Route, Navigate } from "react-router"
import AuthLayout from "./layouts/AuthLayout"
import ContactLayout from "./layouts/ContactLayout"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Entry from "./pages/Entry"

const  App = () => {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/" element={<AuthLayout/>}>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Route>

      <Route path="/contact" element={<ContactLayout/>}>
        <Route index element={<Contact/>}/>
        <Route path="entry" element={<Entry/>}/>
        <Route path="update/:id" element={<Entry isUpdate/>}/>
      </Route>

    </Routes>
  )
}

export default App