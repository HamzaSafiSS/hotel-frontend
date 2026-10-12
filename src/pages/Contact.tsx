import React from 'react';
import { PagePlaceholder } from '../components/ui/PagePlaceholder';

export const Contact: React.FC = () => {
  return (
    <PagePlaceholder
      title="Contact Skyview Concierge"
      eyebrow="Get in Touch"
      subtitle="CONTACT US"
      description="Our dedicated guest relations and reservations team is available 24/7 to assist with room reservations, private event arrangements, dining bookings, and bespoke coastal itineraries."
      suggestedLinks={[
        { label: 'Frequently Asked Questions', path: '/faqs' },
        { label: 'Location & Directions', path: '/location' },
        { label: 'Book a Room', path: '/booking' },
      ]}
    />
  );
};
