import { ImageResponse } from 'next/og';

export const alt = 'لِسيارتك – منصة الحاسبات العربية';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #022c22 0%, #0f172a 100%)',
          color: '#ffffff',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '24px',
              backgroundColor: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '44px',
              fontWeight: 'bold',
              color: '#ffffff',
            }}
          >
            %
          </div>
          <span style={{ fontSize: '64px', fontWeight: '900', letterSpacing: '-1px' }}>
            لِسيارتك<span style={{ color: '#34d399', fontSize: '40px' }}>.com</span>
          </span>
        </div>

        <div
          style={{
            fontSize: '34px',
            fontWeight: 'bold',
            color: '#e2e8f0',
            textAlign: 'center',
            maxWidth: '960px',
            lineHeight: 1.4,
            marginBottom: '20px',
          }}
        >
          منصة الحاسبات العربية المعتمدة
        </div>

        <div
          style={{
            fontSize: '22px',
            color: '#94a3b8',
            textAlign: 'center',
            maxWidth: '800px',
          }}
        >
          أدوات مالية وضريبية ووقود دقيقة ومجانية لمختلف الدول العربية
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
