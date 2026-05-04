import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ padding: '80px 20px 120px', maxWidth: '1400px', margin: '0 auto' }}>
      <div className="relative z-10 flex flex-col items-center text-center" style={{ maxWidth: '780px', margin: '0 auto' }}>
        <p style={{ color: '#0D0B21', fontSize: '16px', fontWeight: 600, marginBottom: '24px' }}>#1 Task Management Platform</p>
        <h1 style={{ color: '#0D0B21', fontSize: 'clamp(36px, 5.5vw, 72px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-2px', marginBottom: '28px' }}>
          Your workflow is unique, simplify it in one place
        </h1>
        <p style={{ color: '#636071', fontSize: '18px', lineHeight: 1.65, maxWidth: '540px', marginBottom: '40px' }}>
          Organize your tech startup&rsquo;s work, improve collaboration, and increase transparency with one tool.
        </p>
        <Link to="/signup" style={{ backgroundColor: '#4318FF', color: '#fff', fontSize: '18px', fontWeight: 600, padding: '18px 44px', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 4px 20px rgba(67,24,255,0.3)' }}
          className="hover:opacity-90 transition-all">Get Started For Free</Link>
      </div>
    </section>
  )
}
