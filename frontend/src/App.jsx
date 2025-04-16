import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Predict from './Predict';
import Insights from './Insights';
import Result from './Result'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/result" element={<Result />} /> {/* ✅ Add this */}
      </Routes>
    </Router>
  );
}

export default App;
