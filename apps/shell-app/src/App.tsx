import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import ErrorBoundary from './components/ErrorBoundary'
import { ConfigurationProvider } from './contexts/ConfigurationContext'

function App() {
  return (
    <ErrorBoundary>
      <ConfigurationProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<Dashboard />} />
              <Route path="/cart" element={<Dashboard />} />
              <Route path="/orders" element={<Dashboard />} />
              <Route path="/checkout" element={<Dashboard />} />
              <Route path="/payment" element={<Dashboard />} />
            </Routes>
          </Layout>
        </Router>
      </ConfigurationProvider>
    </ErrorBoundary>
  )
}

export default App