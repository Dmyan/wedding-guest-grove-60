import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import Index from './pages/Index.tsx';
import Dashboard from './pages/Dashboard.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Index />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  </Router>
);