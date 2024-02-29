import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./Pages/LandingPage"
import SignIn from "./Pages/SignIn"
import Home from "./Pages/Home"

import "./App.css"
import Test from "./Pages/test"
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/test" element={<Test />}></Route>
        
      </Routes>
    </Router>
  )
}
