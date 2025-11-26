
import './App.css'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import UserDashboard from './pages/user/UserDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import EnquiriesForMyFlat from './pages/user/EnquiriesForMyFlat'
import FlatApprovePage from './pages/user/FlatApprovePage'
import MyFlatPage from './pages/user/MyFlatPage'
import EnquiriesPage from './pages/user/EnquiriesPage'
import AdminDashPage from './pages/admin/AdminDashPage'
import PendingFlats from './pages/admin/PendingFlats'
import ApprovedFlats from './pages/admin/ApprovedFlats'
import AllEnquiries from './pages/admin/AllEnquiries'
import SoldFlats from './pages/admin/SoldFlats'
import AddFlatPage from './pages/user/AddFlatPage'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import FeaturePage from './pages/Features'
import ContactPage from './pages/Contact'
import Footer from './components/Footer'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <>
     <ToastContainer position="top-right" autoClose={3000} />
    <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/features' element={<FeaturePage/>}/>
          <Route path='/contact' element={<ContactPage/>}/>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/user-dash' element={<UserDashboard />}>
            <Route index element={<FlatApprovePage />} />
            <Route path='myflats' element={<MyFlatPage />} />
            <Route path='myflats/add' element={<AddFlatPage/>} />
            <Route path='enquiries' element={<EnquiriesPage />} />
            <Route path='enquiries/received' element={<EnquiriesForMyFlat />} />
          </Route>
          <Route path='/admin-dash' element={<AdminDashboard />}>
            <Route index element={<AdminDashPage/>} />
            <Route path='pending' element={<PendingFlats />} />
            <Route path='approved' element={<ApprovedFlats />} />
            <Route path='sold' element={<SoldFlats/>} />
            <Route path='enquiriesAll' element={<AllEnquiries />} />
          </Route>
        </Routes>
      <Footer/>
        </BrowserRouter>
      
    </>
  )
}

export default App
