const partners = [
  'OpenAI', 'Anthropic', 'n8n', 'Make.com', 'Zapier',
  'WhatsApp API', 'SAP Business One', 'Supabase', 'Pipedrive', 'HubSpot',
];

const TrustStrip = () => {
  const all = [...partners, ...partners];

  return (
    <div
      style={{
        borderTop: '1px solid #e5e7eb',
        borderBottom: '1px solid #e5e7eb',
        padding: '24px 0',
        overflow: 'hidden',
        background: '#f9fafb',
      }}
    >
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
          background: 'linear-gradient(to right, #f9fafb, transparent)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
          background: 'linear-gradient(to left, #f9fafb, transparent)',
          pointerEvents: 'none',
        }} />

        <div className="animate-marquee" style={{ display: 'flex', width: 'max-content' }}>
          {all.map((name, i) => (
            <span
              key={i}
              style={{
                padding: '0 32px',
                fontSize: 13,
                fontWeight: 500,
                color: '#9ca3af',
                whiteSpace: 'nowrap',
                borderRight: '1px solid #e5e7eb',
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustStrip;
