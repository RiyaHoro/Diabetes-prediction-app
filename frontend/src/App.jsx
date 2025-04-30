import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Predict from './Predict';
import Insights from './Insights';
import Result from './Result'; 
import ContactForm from "./ContactForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/result" element={<Result />} />
        <Route path="/contact" element={<ContactForm />} />
      </Routes>
    </Router>
  );
}

export default App;
