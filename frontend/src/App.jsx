import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes, Switch, Redirect } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Messages from './components/Messages';
import ProtectedResource from './components/ProtectedResource';
function App() {
  const [accessToken, setAccessToken] = useState(null);

 return (
    <Router>
      <div style={{ padding: '20px' }}>
        <h1>My App</h1>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route 
            path="/login" 
            element={<Login onLogin={(token) => setAccessToken(token)} />} 
          />
          <Route 
            path="/messages" 
            element={accessToken ? <Messages accessToken={accessToken} /> : <Navigate to="/login" />} 
          />
          <Route path="/protected" element={<ProtectedResource accessToken={accessToken} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
