import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../api'

const Logo = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
    <path d="M12 36L24 12L36 36" stroke="#0D0B21" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 28L24 16L30 28" stroke="#4318FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Member')
  const [showPass, setShowPass] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await signup({ name, email, password, role })
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      navigate('/dashboard')
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed')
    }
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#FFFAE9' }}>
      {/* Left - Decorative Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between"
        style={{ backgroundColor: '#0D0B21', padding: '48px' }}>
        {/* Decorative shapes */}
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '220px', height: '220px', backgroundColor: '#F5C542', borderRadius: '50%', opacity: 0.7 }} />
        <div style={{ position: 'absolute', bottom: '80px', left: '-40px', width: '160px', height: '160px', backgroundColor: '#4318FF', borderRadius: '50%', opacity: 0.4 }} />
        <div style={{ position: 'absolute', bottom: '-30px', right: '20%', width: '120px', height: '120px', backgroundColor: '#EC4899', borderRadius: '50%', opacity: 0.3 }} />
        <div style={{ position: 'absolute', top: '40%', left: '10%', width: '180px', height: '180px', border: '2px solid rgba(67,24,255,0.3)', transform: 'rotate(15deg)' }} />
        <div style={{ position: 'absolute', top: '35%', left: '7%', width: '160px', height: '160px', border: '2px solid rgba(232,160,128,0.3)', borderRadius: '50%' }} />
        <svg style={{ position: 'absolute', top: '55%', right: '15%', opacity: 0.3 }} width="100" height="100" viewBox="0 0 120 120" fill="none">
          <path d="M60 10L110 100H10Z" stroke="rgba(245,197,66,0.5)" strokeWidth="2" fill="none" />
        </svg>

        {/* Logo */}
        <div className="relative z-10">
          <Link to="/" className="flex items-center" style={{ gap: '10px' }}>
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
              <path d="M12 36L24 12L36 36" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18 28L24 16L30 28" stroke="#4318FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ color: '#fff', fontSize: '20px', fontWeight: 700 }}>Caution</span>
          </Link>
        </div>

        {/* Center text */}
        <div className="relative z-10" style={{ marginTop: 'auto', marginBottom: 'auto' }}>
          <h2 style={{ color: '#fff', fontSize: '42px', fontWeight: 800, lineHeight: 1.15, marginBottom: '20px' }}>
            Start your 14-day free trial
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '17px', lineHeight: 1.7 }}>
            Join 10,000+ teams who use Caution to simplify their workflow and ship faster.
          </p>
        </div>

        {/* Bottom avatars */}
        <div className="relative z-10 flex items-center" style={{ gap: '-8px' }}>
          <div className="flex items-center">
            {[21,22,23,24,25].map((n, i) => (
              <div key={n} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '3px solid #0D0B21', marginLeft: i > 0 ? '-10px' : '0', overflow: 'hidden' }}>
                <img src={`https://i.pravatar.cc/72?img=${n}`} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginLeft: '12px' }}>Join the community</span>
        </div>
      </div>

      {/* Right - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center" style={{ padding: '40px 24px' }}>
        <div style={{ width: '100%', maxWidth: '440px' }}>
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center" style={{ marginBottom: '32px' }}>
            <Link to="/"><Logo /></Link>
          </div>

          <h1 style={{ color: '#0D0B21', fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>Create an account</h1>
          <p style={{ color: '#636071', fontSize: '16px', marginBottom: '32px' }}>
            Already have an account? <Link to="/login" style={{ color: '#4318FF', fontWeight: 600, textDecoration: 'none' }}>Log in</Link>
          </p>

          {/* Social login */}
          <div className="flex" style={{ gap: '12px', marginBottom: '28px' }}>
            <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '10px', border: '1.5px solid #E8E6E0', backgroundColor: '#fff', cursor: 'pointer', fontSize: '15px', fontWeight: 500, color: '#0D0B21' }}
              className="hover:opacity-80 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </button>
            <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '10px', border: '1.5px solid #E8E6E0', backgroundColor: '#fff', cursor: 'pointer', fontSize: '15px', fontWeight: 500, color: '#0D0B21' }}
              className="hover:opacity-80 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#0D0B21"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              Apple
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center" style={{ gap: '16px', marginBottom: '28px' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#E8E6E0' }} />
            <span style={{ color: '#9896A3', fontSize: '14px' }}>or</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#E8E6E0' }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#0D0B21', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1.5px solid #E8E6E0', fontSize: '15px', backgroundColor: '#fff', outline: 'none', color: '#0D0B21', transition: 'border-color 0.2s' }}
                onFocus={(e) => e.target.style.borderColor = '#4318FF'}
                onBlur={(e) => e.target.style.borderColor = '#E8E6E0'}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#0D0B21', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1.5px solid #E8E6E0', fontSize: '15px', backgroundColor: '#fff', outline: 'none', color: '#0D0B21', transition: 'border-color 0.2s' }}
                onFocus={(e) => e.target.style.borderColor = '#4318FF'}
                onBlur={(e) => e.target.style.borderColor = '#E8E6E0'}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#0D0B21', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1.5px solid #E8E6E0', fontSize: '15px', backgroundColor: '#fff', outline: 'none', color: '#0D0B21' }}
              >
                <option value="Member">Member</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#0D0B21', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  style={{ width: '100%', padding: '14px 48px 14px 16px', borderRadius: '10px', border: '1.5px solid #E8E6E0', fontSize: '15px', backgroundColor: '#fff', outline: 'none', color: '#0D0B21', transition: 'border-color 0.2s' }}
                  onFocus={(e) => e.target.style.borderColor = '#4318FF'}
                  onBlur={(e) => e.target.style.borderColor = '#E8E6E0'}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9896A3', fontSize: '14px' }}>
                  {showPass ? '🙈' : '👁'}
                </button>
              </div>
            </div>

            <p style={{ color: '#636071', fontSize: '13px', lineHeight: 1.5, marginBottom: '28px' }}>
              By signing up, you agree to our <a href="#" style={{ color: '#4318FF', textDecoration: 'none' }}>Terms of Service</a> and <a href="#" style={{ color: '#4318FF', textDecoration: 'none' }}>Privacy Policy</a>.
            </p>

            <button type="submit"
              style={{ width: '100%', padding: '16px', borderRadius: '10px', backgroundColor: '#4318FF', color: '#fff', fontSize: '16px', fontWeight: 600, border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(67,24,255,0.3)', transition: 'all 0.2s' }}
              className="hover:opacity-90">
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
