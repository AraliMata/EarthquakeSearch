import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/pages/HomePage/Home';
import Footer from './components/Footer';
import History from './components/pages/History';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/history' element={<History />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
