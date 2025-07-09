import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import CategoryPage from "./pages/CategoryPage";
import Analytics from "./pages/Analytics";
import UserManagement from "./pages/UserManagement";
import Admin from "./pages/Admin";
import ErrorBoundary from "./components/ErrorBoundary";
import { ConfigurationProvider } from "./contexts/ConfigurationContext";

function App() {
  return (
    <ErrorBoundary>
      <ConfigurationProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/category/:category" element={<CategoryPage />} />
            </Routes>
          </Layout>
        </Router>
      </ConfigurationProvider>
    </ErrorBoundary>
  );
}

export default App;
