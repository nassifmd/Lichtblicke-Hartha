import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LegalPage from './LegalPage';
import LoginPage from './LoginPage';
import ProtectedForm from './ProtectedForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LegalPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/form" element={<ProtectedForm />} />
      </Routes>
    </Router>
  );
}

export default App;
