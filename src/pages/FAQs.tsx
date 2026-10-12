import React from 'react';
import { PagePlaceholder } from '../components/ui/PagePlaceholder';

export const FAQs: React.FC = () => {
  return (
    <PagePlaceholder
      title="Frequently Asked Questions"
      eyebrow="Help & Information"
      subtitle="FAQS"
      description="Find answers to guest inquiries regarding check-in arrivals, valet parking, private airport transfers, dining reservations, and resort privileges."
      suggestedLinks={[
        { label: 'Location & Directions', path: '/location' },
        { label: 'Contact Us', path: '/contact' },
        { label: 'Book a Room', path: '/booking' },
      ]}
    />
  );
};
