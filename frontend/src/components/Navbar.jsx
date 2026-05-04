import { Link } from 'react-router-dom'
const Logo = () => (
  <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
    {/* Icon */}
    <g transform="translate(0,0)">
      <path d="M12 36L24 12L36 36" stroke="#0D0B21" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 28L24 16L30 28" stroke="#4318FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </g>

    {/* Text */}
    <text
      x="50"
      y="35"
      fontSize="18"
      fontWeight="600"
      fill="#0D0B21"
      fontFamily="Arial, sans-serif"
    >
      Taskify
    </text>
  </svg>
)

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between" style={{ padding: '20px 60px', maxWidth: '1400px', margin: '0 auto' }}>
      <Link to="/" className="flex items-center"><Logo /></Link>
      <div className="hidden md:flex items-center" style={{ gap: '36px' }}>
        {['Features', 'Services', 'Resources', 'About us'].map(item => (
          <a key={item} href="#" style={{ color: '#0D0B21', fontSize: '16px', fontWeight: 500, textDecoration: 'none' }}
            className="hover:opacity-70 transition-opacity">{item}</a>
        ))}
      </div>
      <div className="flex items-center" style={{ gap: '20px' }}>
        <Link to="/login" style={{ color: '#0D0B21', fontSize: '16px', fontWeight: 600, textDecoration: 'none' }}>Login</Link>
        <Link to="/signup" style={{ backgroundColor: '#0D0B21', color: '#fff', fontSize: '16px', fontWeight: 600, padding: '12px 28px', borderRadius: '8px', textDecoration: 'none' }}
          className="hover:opacity-90 transition-opacity">Sign up</Link>
      </div>
    </nav>
  )
}
