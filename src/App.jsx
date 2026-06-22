import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CreateQuote from './pages/CreateQuote'
import QuoteResult from './pages/QuoteResult'
import CreateApplication from './pages/CreateApplication'
import Proposals from './pages/Proposals'
import ProposalDetail from './pages/ProposalDetail'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />
  }

  return (
    <BrowserRouter>
      <Layout onLogout={() => setIsLoggedIn(false)}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/quotes/new" element={<CreateQuote />} />
          <Route path="/quotes/result" element={<QuoteResult />} />
          <Route path="/applications/new" element={<CreateApplication />} />
          <Route path="/proposals" element={<Proposals />} />
          <Route path="/proposals/:id" element={<ProposalDetail />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
