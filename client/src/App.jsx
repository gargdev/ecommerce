// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

function App() {
  return (
    <Router>
      <Header />
      <main className="">
        <AppRoutes />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
