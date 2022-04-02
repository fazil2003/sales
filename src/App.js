import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Customers from './components/customers.component';
import Products from './components/products.component';
import Reports from './components/reports.component';
import Sales from './components/sales.component';
import Settings from './components/settings.component';

function App() {
  return (
    <Router>
      <div class="container">
        <Routes>
          <Route exact path="/" element={<Products/>} />
          <Route path="/customers" element={<Customers/>} />
          <Route path="/reports" element={<Reports/>} />
          <Route path="/sales" element={<Sales/>} />
          <Route path="/settings" element={<Settings/>} />
          <Route path="*" element={<Settings/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
