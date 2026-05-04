export default function Integrations() {
  const logos = [
    { name: 'Salesforce', color: '#00A1E0' },
    { name: 'Trello', color: '#0079BF' },
    { name: 'Servisair', color: '#0097A7' },
    { name: 'Office 365', color: '#D83B01' },
    { name: 'Merci', color: '#00897B' },
    { name: 'HubSpot', color: '#FF7A59' },
    { name: 'Slack', color: '#4A154B' },
    { name: 'Workly', color: '#5C6BC0' },
  ]

  return (
    <section style={{ backgroundColor: '#3B2BF9', padding: '100px 40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ color: '#fff', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, lineHeight: 1.2, marginBottom: '16px' }}>
          Connect caution with<br />all the things
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '17px', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 48px' }}>
          Our platform has 1000+ integrations and can easily be configured to connect to any SaaS or on premises system.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: '16px' }}>
          {logos.map(logo => (
            <div key={logo.name} style={{ backgroundColor: '#fff', borderRadius: '14px', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80px' }}>
              <span style={{ color: logo.color, fontSize: '22px', fontWeight: 800, letterSpacing: '-0.5px' }}>{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
