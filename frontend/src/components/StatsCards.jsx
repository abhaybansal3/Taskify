const ProgressBar = ({ label, value, max, color }) => (
  <div style={{ marginBottom: '24px' }}>
    <div className="flex justify-between items-center" style={{ marginBottom: '8px' }}>
      <span style={{ color: '#0D0B21', fontSize: '15px', fontWeight: 700 }}>{label}</span>
      <span style={{ color: '#636071', fontSize: '14px' }}>{value}/{max}</span>
    </div>
    <div style={{ height: '8px', backgroundColor: '#E8E6E0', borderRadius: '4px', overflow: 'hidden' }}>
      <div className="animate-progress" style={{ height: '100%', width: `${(value/max)*100}%`, backgroundColor: color, borderRadius: '4px' }} />
    </div>
  </div>
)

export default function StatsCards() {
  return (
    <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px 80px' }}>
      <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '24px' }}>
        {/* Task Progress Card */}
        <div style={{ backgroundColor: '#F7F5F0', borderRadius: '16px', padding: '32px' }}>
          <h3 style={{ color: '#0D0B21', fontSize: '22px', fontWeight: 700, marginBottom: '4px' }}>Task Progress</h3>
          <p style={{ color: '#636071', fontSize: '14px', marginBottom: '28px' }}>Recent all kind of running tasks</p>
          <ProgressBar label="Web Design" value={5} max={10} color="#F5C542" />
          <ProgressBar label="Mobile App Design" value={8} max={10} color="#F472B6" />
          <ProgressBar label="Web App Design" value={7} max={10} color="#22D3EE" />
          <ProgressBar label="Development" value={4} max={10} color="#8B5CF6" />
        </div>

        {/* Finance Mobile App Card */}
        <div style={{ backgroundColor: '#F7F5F0', borderRadius: '16px', padding: '32px' }}>
          <div style={{ backgroundColor: '#E8D5A0', borderRadius: '12px', overflow: 'hidden', marginBottom: '20px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop" alt="Finance app" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <h3 style={{ color: '#0D0B21', fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>Finance mobile app</h3>
          <div className="flex justify-between items-center" style={{ marginBottom: '8px' }}>
            <div className="flex items-center" style={{ gap: '6px' }}>
              <span style={{ fontSize: '14px', color: '#636071' }}>☰ Progress</span>
            </div>
            <span style={{ fontSize: '14px', color: '#636071' }}>8/10</span>
          </div>
          <div style={{ height: '8px', backgroundColor: '#E8E6E0', borderRadius: '4px', overflow: 'hidden', marginBottom: '20px' }}>
            <div style={{ height: '100%', width: '80%', backgroundColor: '#4318FF', borderRadius: '4px' }} />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center" style={{ gap: '12px', color: '#636071', fontSize: '14px' }}>
              <span>💬 6</span><span>🔗 3</span>
            </div>
            <div className="flex items-center">
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid #F7F5F0', overflow: 'hidden', marginLeft: '-8px', backgroundColor: '#E8A317' }}>
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face" alt="" className="w-full h-full object-cover" />
              </div>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid #F7F5F0', overflow: 'hidden', marginLeft: '-8px', backgroundColor: '#A5E8F0' }}>
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face" alt="" className="w-full h-full object-cover" />
              </div>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid #F7F5F0', marginLeft: '-8px', backgroundColor: '#4318FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '10px', fontWeight: 700 }}>+5</div>
            </div>
          </div>
        </div>

        {/* Reviews Card */}
        <div style={{ backgroundColor: '#F7F5F0', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div className="flex" style={{ gap: '4px', marginBottom: '16px' }}>
            {[1,2,3,4,5].map(i => <span key={i} style={{ fontSize: '36px', color: '#F5C542' }}>★</span>)}
          </div>
          <h3 style={{ color: '#0D0B21', fontSize: '36px', fontWeight: 800, marginBottom: '8px' }}>10000+</h3>
          <p style={{ color: '#636071', fontSize: '16px', marginBottom: '24px' }}>Clients reviews (4.5 of 5)</p>
          <a href="#" style={{ color: '#0D0B21', fontSize: '16px', fontWeight: 600, textDecoration: 'none', borderBottom: '2px solid #0D0B21', paddingBottom: '4px' }}>Read More</a>
        </div>
      </div>
    </section>
  )
}
