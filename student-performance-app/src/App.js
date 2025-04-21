import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PredictForm from './PredictForm';
import ResultPage from './ResultPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PredictForm />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}
export default App;