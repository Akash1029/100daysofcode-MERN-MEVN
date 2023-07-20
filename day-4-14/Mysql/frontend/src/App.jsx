import { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import { Login, Signup, ForgotPassword, ResetPassword } from "./Pages";
import Home from "./Pages/Home";
import './App.css';
import NotFoundPage from './Pages/404'
import CustomSwitch from './CustomSwitch'
function App() {
  const [loading, setLoading] = useState(false);  
  const hideLoader = (loading) => {
    setLoading(loading);
  };
  return (
    <div className="App">
      <div className={`loader-container ${loading ? "hide":"" }`}>
        <div className="spinner"></div>
      </div>
      <CustomSwitch>
        <Routes>
          <Route path="/" element={<Home hideLoader={hideLoader}/>} />
          <Route path="/login" element={<Login hideLoader={hideLoader} />} />
          <Route path="/signup" element={<Signup hideLoader={hideLoader} />} />
          <Route path="/forgot-password" element={<ForgotPassword hideLoader={hideLoader} />} />
          <Route path="/reset-password/:token" element={<ResetPassword hideLoader={hideLoader} />}/>
          <Route path="*" element={<NotFoundPage hideLoader={hideLoader}/>}></Route>
        </Routes>
      </CustomSwitch>
    </div>
  )
}

export default App;
