import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Upload from './components/Upload';
import Results from './components/Results';  
import '../css/app.css';


function App() {
    return (
        <Router>
            <div>
                <nav>
                    <Link to="/">Upload</Link>
                    <Link to="/results">Results</Link>
                </nav>
                <main>
                    <Routes>
                        <Route path="/" element={<Upload />} />
                        <Route path="/results" element={<Results />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

// Update this line to use `createRoot` instead of `render`
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
