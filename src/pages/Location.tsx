import React from 'react';
import { PagePlaceholder } from '../components/ui/PagePlaceholder';

export const Location: React.FC = () => {
  return (
    <PagePlaceholder
      title="Location & Directions"
      eyebrow="Arriving in Paradise"
      subtitle="MAP & TRAVEL GUIDE"
      description="Skyview Hotels & Resorts is nestled along the scenic coastal cliffs of Azure Haven. Accessible via picturesque coastal highways, regional airports, and private chauffeured transfers."
      suggestedLinks={[
        { label: 'Contact Us', path: '/contact' },
        { label: 'Explore Rooms', path: '/rooms' },
        { label: 'FAQs', path: '/faqs' },
      ]}
    />
  );
};
