import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./app/page";
import "./index.css"; // ✅ Tailwind styles
import Header from "./components/layout/header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Home />} />
        <Route path="/about-us" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Home />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
