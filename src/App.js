import './App.css';
import Scheduler from './pages/Scheduler';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './pages/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scheduler" element={<Scheduler />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
