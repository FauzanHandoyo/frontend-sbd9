import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import MainPage from './components/mainPage';
import ProtectedRoute from './components/ProtectedRoutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
        path="/main" element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        }/>
      </Routes>
    </Router>
  );
}

export default App;