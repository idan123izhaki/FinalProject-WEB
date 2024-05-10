import { Route, Routes } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from '../components/Navbar'
import Home from "../components/homePage/home-page.jsx"
import NewSession from "../components/newSession/new-session.jsx"
import SessionPanel from "../components/sessionPanel/session-panel.jsx"
import AboutUs from "../components/aboutUs/about-us.jsx"

function App() {
  return (
    <>
      <Navbar />
      {/* <div className='container mt-3'> */}
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newsession" element={<NewSession />} />
          <Route path="/sessions" element={<SessionPanel />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </div>
    </>
  );
}

export default App
