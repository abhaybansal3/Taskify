import { Link } from 'react-router-dom'

export default function CTASection() {
  return (
    <section style={{ backgroundColor: '#0D0B21', padding: '120px 40px', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative shapes */}
      <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', backgroundColor: '#F5C542', borderRadius: '50%', opacity: 0.8 }} />
      <div style={{ position: 'absolute', top: '60%', left: '-20px', width: '100px', height: '100px', backgroundColor: '#E8A080', borderRadius: '50%', opacity: 0.6 }} />
      <div style={{ position: 'absolute', bottom: '40px', left: '30%', width: '140px', height: '140px', backgroundColor: '#F5C542', borderRadius: '50%', opacity: 0.5 }} />
      <div style={{ position: 'absolute', right: '40%', top: '60%', width: '50px', height: '50px', backgroundColor: '#C4B5FD', borderRadius: '50%', opacity: 0.5 }} />
      {/* Geometric outlines */}
      <div style={{ position: 'absolute', top: '20%', left: '5%', width: '160px', height: '160px', border: '2px solid rgba(67,24,255,0.4)', transform: 'rotate(15deg)' }} />
      <div style={{ position: 'absolute', top: '30%', left: '2%', width: '140px', height: '140px', border: '2px solid rgba(232,160,128,0.4)', transform: 'rotate(-10deg)' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '120px', height: '120px', border: '2px solid rgba(67,24,255,0.3)', transform: 'rotate(20deg)' }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '8%', width: '100px', height: '100px', border: '2px solid rgba(232,160,128,0.3)', borderRadius: '50%' }} />
      {/* Triangle */}
      <svg style={{ position: 'absolute', top: '25%', left: '3%', opacity: 0.4 }} width="120" height="120" viewBox="0 0 120 120" fill="none">
        <path d="M60 10L110 100H10Z" stroke="rgba(232,160,128,0.5)" strokeWidth="2" fill="none" />
      </svg>

      <div className="relative z-10 text-center" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ color: '#fff', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, lineHeight: 1.15, marginBottom: '20px' }}>
          Manage your team now
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '17px', lineHeight: 1.7, marginBottom: '40px' }}>
          Your workflow is unique, simplify it in one place.
        </p>
        <div className="flex flex-wrap items-center justify-center" style={{ gap: '16px' }}>
          <Link to="/signup" style={{ backgroundColor: '#4318FF', color: '#fff', fontSize: '16px', fontWeight: 600, padding: '16px 36px', borderRadius: '10px', textDecoration: 'none' }}
            className="hover:opacity-90 transition-opacity">Get Started For Free</Link>
          <a href="#" style={{ backgroundColor: '#fff', color: '#0D0B21', fontSize: '16px', fontWeight: 600, padding: '16px 36px', borderRadius: '10px', textDecoration: 'none' }}
            className="hover:opacity-90 transition-opacity">Watch Demo</a>
        </div>
      </div>
    </section>
  )
}
