const TaskCard = ({ tag, tagColor, date }) => (
  <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px', flex: 1 }}>
    <div className="flex justify-between items-start" style={{ marginBottom: '12px' }}>
      <span style={{ backgroundColor: tagColor, color: '#fff', fontSize: '13px', fontWeight: 600, padding: '4px 14px', borderRadius: '6px' }}>{tag}</span>
      <span style={{ color: '#636071', fontSize: '18px' }}>⋯</span>
    </div>
    <p style={{ color: '#0D0B21', fontSize: '14px', fontWeight: 500, marginBottom: '12px' }}>Low-fidelity (wireframe) design- Website</p>
    <div className="flex items-center" style={{ gap: '6px', marginBottom: '16px' }}>
      <span style={{ color: '#636071', fontSize: '13px' }}>🕐 {date}</span>
    </div>
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        {[11,12,13].map((n,i) => (
          <div key={i} style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #fff', marginLeft: i>0?'-6px':'0', overflow: 'hidden' }}>
            <img src={`https://i.pravatar.cc/48?img=${n}`} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <div className="flex items-center" style={{ gap: '8px', color: '#636071', fontSize: '13px' }}>
        <span>💬 6</span><span>🔗 3</span>
      </div>
    </div>
  </div>
)

export default function ManageTasks() {
  return (
    <section style={{ backgroundColor: '#FFFAE9', padding: '100px 40px' }}>
      <div className="flex flex-col lg:flex-row items-center" style={{ maxWidth: '1200px', margin: '0 auto', gap: '60px' }}>
        {/* Left - Task Board Mockup */}
        <div className="lg:w-1/2">
          <div style={{ backgroundColor: '#0D0B21', borderRadius: '20px', padding: '12px', border: '4px solid #E8A317' }}>
            {/* Browser dots */}
            <div className="flex items-center" style={{ gap: '6px', padding: '8px 12px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#F5C542' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#4CAF50' }} />
            </div>
            <div className="grid grid-cols-2" style={{ gap: '12px', padding: '8px' }}>
              <TaskCard tag="Research" tagColor="#8DA677" date="July 16" />
              <TaskCard tag="Wireframe" tagColor="#F472B6" date="July 17" />
              <TaskCard tag="Design" tagColor="#4318FF" date="July 18" />
              <TaskCard tag="Development" tagColor="#22B8CF" date="July 19" />
            </div>
          </div>
        </div>

        {/* Right - Text */}
        <div className="lg:w-1/2">
          <h2 style={{ color: '#0D0B21', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, lineHeight: 1.15, marginBottom: '24px' }}>
            Manage your task very organizely
          </h2>
          <p style={{ color: '#636071', fontSize: '17px', lineHeight: 1.7, marginBottom: '32px' }}>
            Whether you&rsquo;re a freelancer, a small business owner, or a seasoned professional, our platform ensures that you never miss out on the perfect project again.
          </p>
          <a href="#" style={{ backgroundColor: '#0D0B21', color: '#fff', fontSize: '16px', fontWeight: 600, padding: '16px 36px', borderRadius: '10px', textDecoration: 'none', display: 'inline-block' }}
            className="hover:opacity-90 transition-opacity">Get Started For Free</a>
        </div>
      </div>
    </section>
  )
}
