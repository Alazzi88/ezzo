// src/components/AdUnit.tsx
import { useEffect, useRef } from 'react';

interface AdUnitProps {
  slotId: string;
  format?: string;
  responsive?: boolean;
  style?: React.CSSProperties;
}

const AdUnit: React.FC<AdUnitProps> = ({ slotId, format = 'auto', responsive = true, style }) => {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (window) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('AdSense error:', e);
      }
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', ...style }}
      data-ad-client="ca-pub-9870463298829321"
      data-ad-slot={slotId}
      data-ad-format={format}
      data-full-width-responsive={responsive ? 'true' : 'false'}
      ref={adRef}
    />
  );
};

export default AdUnit;
