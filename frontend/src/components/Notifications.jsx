import heroImage from '../assets/hero.png'

export default function Notifications() {
  return (
    <section style={{ backgroundColor: '#0D0B21', padding: '100px 40px', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative circles */}
      <div style={{ position: 'absolute', top: '50%', right: '25%', transform: 'translate(50%, -50%)', width: '500px', height: '500px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', top: '50%', right: '25%', transform: 'translate(50%, -50%)', width: '380px', height: '380px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '50%' }} />

      <div className="flex flex-col lg:flex-row items-center" style={{ maxWidth: '1200px', margin: '0 auto', gap: '60px' }}>
        {/* Left text */}
        <div className="lg:w-1/2">
          <h2 style={{ color: '#fff', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, lineHeight: 1.15, marginBottom: '24px' }}>
            Get real time projects notifications
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '17px', lineHeight: 1.7, marginBottom: '16px' }}>
            Introducing our revolutionary platform that keeps you ahead of the game - RealTime Projects Notifications!
          </p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '17px', lineHeight: 1.7 }}>
            Say goodbye to missed opportunities and hello to staying informed and on top of your game. With our cutting-edge technology, you&rsquo;ll receive instant alerts and updates about the latest and most relevant projects in your field.
          </p>
        </div>

        {/* Right cards */}
        <div className="lg:w-1/2 relative" style={{ minHeight: '350px' }}>
          {/* Notification card */}
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px', position: 'absolute', top: '0', right: '0', boxShadow: '0 8px 30px rgba(0,0,0,0.15)', zIndex: 2, maxWidth: '380px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: '#EF4444', fontSize: '14px' }}>⚠</span>
            </div>
            <p style={{ color: '#0D0B21', fontSize: '15px', fontWeight: 500 }}>Please, <span style={{ color: '#4318FF', textDecoration: 'underline' }}>get access</span> to add new task</p>
          </div>

          {/* Task card */}
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', position: 'absolute', top: '60px', right: '20px', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', zIndex: 1, width: '340px' }}>
            <h4 style={{ color: '#0D0B21', fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Finance mobile app</h4>
            <div style={{ backgroundColor: '#F7F5F0', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={heroImage} alt="Finance app" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '20px' }} />
            </div>
            <div className="flex items-center" style={{ gap: '6px', marginBottom: '6px' }}>
              <span style={{ fontSize: '13px', color: '#636071' }}>☰ Progress</span>
              <span style={{ marginLeft: 'auto', fontSize: '13px', color: '#636071' }}>8/10</span>
            </div>
            <div style={{ height: '6px', backgroundColor: '#E8E6E0', borderRadius: '3px', overflow: 'hidden', marginBottom: '20px' }}>
              <div style={{ height: '100%', width: '80%', backgroundColor: '#4318FF', borderRadius: '3px' }} />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center" style={{ gap: '10px', color: '#636071', fontSize: '13px' }}>
                <span>💬 6</span><span>🔗 3</span>
              </div>
              <div className="flex items-center">
                {['#E8A317','#A5E8F0','#F8B4C8'].map((c,i) => (
                  <div key={i} style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: c, border: '2px solid #fff', marginLeft: i>0?'-8px':'0', overflow: 'hidden' }}>
                    <img src={`https://i.pravatar.cc/60?img=${20+i}`} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#4318FF', border: '2px solid #fff', marginLeft: '-8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '9px', fontWeight: 700 }}>+5</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
