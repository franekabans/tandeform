import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Upload from './components/Upload';
import Results from './components/Results';
import '../sass/app.scss';

function App() {
    return (
        <Router>
                    <Routes>
                        <Route path="/" element={<Upload />} />
                        <Route path="/results" element={<Results />} />
                    </Routes>
        </Router>
    );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
