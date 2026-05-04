const Logo = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
    <path d="M12 36L24 12L36 36" stroke="#0D0B21" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 28L24 16L30 28" stroke="#4318FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const footerData = {
  Company: ['About us', 'Contact us', 'Careers', 'Affiliate program', 'Partnerships'],
  Product: ['Overview', 'Pricing', 'Integrations', 'Security', 'Customers', 'Status'],
  Resources: ['Video tutorials', 'Help center', 'Product walkthroughs', 'Blog', 'Events', 'Airfocus templates'],
  Support: ['Career', 'Press kit', 'Partners', 'Contact us'],
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#FFFAE9', padding: '60px 40px 40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Top: logo + tagline */}
        <div className="text-center" style={{ marginBottom: '32px' }}>
          <div className="flex justify-center" style={{ marginBottom: '12px' }}><Logo /></div>
          <p style={{ color: '#636071', fontSize: '16px' }}>Your workflow is unique, simplify it in one place.</p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #E8E6E0', marginBottom: '40px' }} />

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: '32px', marginBottom: '40px' }}>
          {Object.entries(footerData).map(([title, links]) => (
            <div key={title}>
              <h4 style={{ color: '#0D0B21', fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>{title}</h4>
              {links.map(link => (
                <a key={link} href="#" style={{ display: 'block', color: '#636071', fontSize: '15px', textDecoration: 'none', marginBottom: '10px' }}
                  className="hover:opacity-70 transition-opacity">{link}</a>
              ))}
            </div>
          ))}
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #E8E6E0', marginBottom: '24px' }} />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-center" style={{ gap: '12px' }}>
          <p style={{ color: '#9896A3', fontSize: '14px' }}>© 2024 Caution. All rights reserved.</p>
          <div className="flex items-center" style={{ gap: '20px' }}>
            {['Terms of services', 'Privacy', 'Security'].map(link => (
              <a key={link} href="#" style={{ color: '#9896A3', fontSize: '14px', textDecoration: 'none' }}
                className="hover:opacity-70 transition-opacity">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
