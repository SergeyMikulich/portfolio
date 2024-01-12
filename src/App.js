import React, { useContext } from 'react';
import '../src/css/style.scss';
import Sidebar from './component/Sidebar';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Updated import
import Home from './component/Home.jsx';
import About from './component/About.jsx';
import Resume from './component/Resume.jsx';
import Contact from './component/Contact.jsx';
import Portfolio from './component/Portfolio.jsx';
import { AuthContext, AuthContextProvider } from './component/chat/context/AuthContext.js';
import { ChatContextProvider } from './component/chat/context/ChatContext.js';
import Chat from './component/chat/App.js';
import Login from './component/chat/pages/Login.jsx';
import Register from './component/chat/pages/Register.jsx';
import HomePage from './component/chat/pages/Home.jsx';
import Weather from './component/weather/Weather.jsx';

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/chat/login" />;
    }

    return children
  };
  return (
    <div className='global-app'>
      <Router> {/* Use either BrowserRouter or Router */}
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/chat">
            <Route index element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/chat/login" element={<Login />} />
            <Route path="/chat/register" element={<Register />} />
          </Route>
          <Route path="/weather" element={<Weather/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
