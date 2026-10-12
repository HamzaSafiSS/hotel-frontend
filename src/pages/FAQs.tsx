import React from 'react';
import { PagePlaceholder } from '../components/ui/PagePlaceholder';

export const FAQs: React.FC = () => {
  return (
    <PagePlaceholder
      title="Frequently Asked Questions"
      eyebrow="Help & Information"
      subtitle="FAQS"
      description="Find answers to common guest inquiries regarding check-in times, airport transfers, cancellation policies, pet regulations, and resort accessibility. The searchable FAQ accordion will be developed in an upcoming phase."
      upcomingPhase="Phase 2 / Phase 3"
      suggestedLinks={[
        { label: 'Location & Directions', path: '/location' },
        { label: 'Contact Us', path: '/contact' },
        { label: 'Book a Room', path: '/booking' },
      ]}
    />
  );
};
