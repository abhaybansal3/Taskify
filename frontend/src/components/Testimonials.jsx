const TestimonialCard = ({ name, role }) => (
  <div style={{ backgroundColor: '#F7F5F0', borderRadius: '16px', padding: '32px', flex: 1 }}>
    <p style={{ color: '#0D0B21', fontSize: '22px', fontWeight: 700, marginBottom: '4px', fontStyle: 'italic' }}>
      <span style={{ color: '#4318FF' }}>W</span>eb<span style={{ color: '#E8A317' }}>d</span>esign
    </p>
    <p style={{ color: '#636071', fontSize: '15px', lineHeight: 1.7, margin: '20px 0 28px' }}>
      Caution has helped me to manage my team very easily. Managing task and projects never been easy and flexible before to me.
    </p>
    <div className="flex items-center" style={{ gap: '12px' }}>
      <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#E8A317', overflow: 'hidden' }}>
        <img src="https://i.pravatar.cc/88?img=32" alt={name} className="w-full h-full object-cover" />
      </div>
      <div>
        <p style={{ color: '#0D0B21', fontSize: '15px', fontWeight: 700 }}>{name}</p>
        <p style={{ color: '#636071', fontSize: '13px' }}>{role}</p>
      </div>
    </div>
  </div>
)

export default function Testimonials() {
  return (
    <section style={{ backgroundColor: '#FFFAE9', padding: '80px 40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ color: '#0D0B21', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, lineHeight: 1.15, marginBottom: '48px', maxWidth: '650px' }}>
          Hear from Caution users who have saved thousands on their SaaS spend.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '24px' }}>
          <TestimonialCard name="Moskur Alam" role="Co-Founder, Web Design" />
          <TestimonialCard name="Moskur Alam" role="Co-Founder, Web Design" />
        </div>
      </div>
    </section>
  )
}
