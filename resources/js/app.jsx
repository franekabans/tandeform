import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Upload from './components/Upload';
import Results from './components/Results';
import '../sass/app.scss';

function App() {
    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                    <div className="container">
                        <ul className="navbar-nav me-auto">
                            <li>
                                <a href="/" className="clickable-nav-item"><span className="nav-label">Upload</span></a>
                            </li>
                            <li>
                                <a href='/results' className="clickable-nav-item"><span className="nav-label">Results</span></a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <main className="container mt-5 pt-4">
                    <Routes>
                        <Route path="/" element={<Upload />} />
                        <Route path="/results" element={<Results />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
