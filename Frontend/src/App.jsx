import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import BuyCredit from './pages/BuyCredit';
import Result from './pages/Result';
import Navbar from './components/Navbar';
import { Button } from './components/myUi/button';
import Footer from './components/Footer';
import { LogIn } from 'lucide-react';
import Login from './components/Login';
import { AppContext } from './context/AppContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackgroundRemover from './pages/bg-removal';
import './App.css'
import ProtectedRoute from './components/protected/Protected';
import ShortVidGen from './pages/ShortVidGen';


const App = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { showLogin, setShowLogin } = useContext(AppContext);
  return (

    <div className='px-4  sm:px-6 md:px-6 lg:px-8 relative  '>

      <ToastContainer position='bottom-right' />
      {!isHomePage && <Navbar />}
      {
        showLogin &&
        <Login />
      }
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/result" element={<ProtectedRoute element={<Result />} />} />
        <Route path="/buycredit" element={<BuyCredit />} />
        <Route path="/bgremoval" element={<ProtectedRoute element={<BackgroundRemover />} />} />
        <Route path="/short-vid-gen" element={<ProtectedRoute element={<ShortVidGen />} />} />


      </Routes>
      <Footer />

    </div>

  );
}

export default App;
