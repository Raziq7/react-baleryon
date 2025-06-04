import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './app/page';
import './index.css' // ✅ Tailwind styles
import Header from './components/layout/header';
import ShopPage from './app/products/page';


function App() {
  return (
    <Router>
        <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/products" element={<ShopPage/>} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;