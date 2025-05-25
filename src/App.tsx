import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './app/page';
import './index.css' // ✅ Tailwind styles
import Header from './components/layout/header';


function App() {
  return (
    <Router>
      <div className="nav">
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </div>

        <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<div>ABOUT</div>} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;