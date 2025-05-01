import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';

const About = () => <div>About Page</div>;
const Pages = () => <div>Pages Section</div>;
const Features = () => <div>Features Section</div>;
const Blog = () => <div>Blog Section</div>;

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/pages" element={<Pages />} />
          <Route path="/features" element={<Features />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
