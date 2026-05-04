export default function VideoSection() {
  return (
    <section style={{ backgroundColor: '#FFFAE9', padding: '80px 40px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ borderRadius: '20px', overflow: 'hidden', position: 'relative', boxShadow: '0 12px 40px rgba(0,0,0,0.1)', border: '4px solid rgba(255,255,255,0.3)' }}>
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=500&fit=crop"
            alt="Team collaboration"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
          {/* Play button overlay */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80px', height: '80px', backgroundColor: 'rgba(255,255,255,0.85)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#4318FF">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
