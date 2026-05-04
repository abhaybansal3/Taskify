import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsCards from './components/StatsCards'
import Notifications from './components/Notifications'
import ManageTasks from './components/ManageTasks'
import OrganizeTasks from './components/OrganizeTasks'
import Integrations from './components/Integrations'
import VideoSection from './components/VideoSection'
import Testimonials from './components/Testimonials'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'

const Home = () => (
  <>
    <Navbar />
    <Hero />
    <StatsCards />
    <Notifications />
    <ManageTasks />
    <OrganizeTasks />
    <Integrations />
    <VideoSection />
    <Testimonials />
    <CTASection />
    <Footer />
  </>
)

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
