export default function OrganizeTasks() {
  const goals = [
    { pct: '100%', text: 'Design and Development of a real estate company website', color: '#F472B6' },
    { pct: '75%', text: "Design food delivery website's pages", color: '#22D3EE' },
    { pct: '50%', text: "Education landing page's development", color: '#F5C542' },
  ]

  return (
    <section style={{ backgroundColor: '#FFFAE9', padding: '80px 40px' }}>
      <div className="flex flex-col lg:flex-row items-center" style={{ maxWidth: '1200px', margin: '0 auto', gap: '60px' }}>
        {/* Left text */}
        <div className="lg:w-1/2">
          <h2 style={{ color: '#0D0B21', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, lineHeight: 1.15, marginBottom: '24px' }}>
            Keep your tasks organized effectively and easily
          </h2>
          <p style={{ color: '#636071', fontSize: '17px', lineHeight: 1.7, marginBottom: '28px' }}>
            Don&rsquo;t let disorganized tasks hinder your project&rsquo;s success. Embrace efficiency, productivity, and peace of mind with our powerful project task management system.
          </p>
          {['Set new project/task goal', 'Edit your task/project', 'Flexibility to add/remove task'].map(item => (
            <div key={item} className="flex items-center" style={{ gap: '10px', marginBottom: '14px' }}>
              <span style={{ color: '#4318FF', fontSize: '18px' }}>✔</span>
              <span style={{ color: '#0D0B21', fontSize: '16px', fontWeight: 500 }}>{item}</span>
            </div>
          ))}
        </div>

        {/* Right - Goals card */}
        <div className="lg:w-1/2">
          <div style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '28px', border: '4px solid #6DBB7A', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
            <div className="flex justify-between items-center" style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#0D0B21', fontSize: '18px', fontWeight: 600 }}>Totals Goals</h3>
              <div className="flex items-center" style={{ gap: '8px' }}>
                <span style={{ fontSize: '20px', color: '#636071' }}>+</span>
                <span style={{ fontSize: '20px', color: '#636071' }}>⋯</span>
              </div>
            </div>
            {goals.map((g, i) => (
              <div key={i} style={{ backgroundColor: g.color, borderRadius: '12px', padding: '20px', marginBottom: i < goals.length - 1 ? '12px' : '0' }}>
                <p style={{ color: '#0D0B21', fontSize: '24px', fontWeight: 800, marginBottom: '4px' }}>{g.pct}</p>
                <p style={{ color: '#0D0B21', fontSize: '14px', fontWeight: 500 }}>{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
