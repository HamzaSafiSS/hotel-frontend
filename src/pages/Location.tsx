import React from 'react';
import { PagePlaceholder } from '../components/ui/PagePlaceholder';

export const Location: React.FC = () => {
  return (
    <PagePlaceholder
      title="Location & Directions"
      eyebrow="Arriving in Paradise"
      subtitle="MAP & TRAVEL GUIDE"
      description="Skyview Hotels & Resorts is nestled along the scenic coastal bay. Detailed interactive maps, driving routes, helipad coordinates, and airport concierge transfer options will be developed in an upcoming phase."
      upcomingPhase="Phase 2 / Phase 3"
      suggestedLinks={[
        { label: 'Contact Us', path: '/contact' },
        { label: 'Explore Rooms', path: '/rooms' },
        { label: 'FAQs', path: '/faqs' },
      ]}
    />
  );
};
