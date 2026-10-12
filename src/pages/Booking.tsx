import React from 'react';
import { PagePlaceholder } from '../components/ui/PagePlaceholder';

export const Booking: React.FC = () => {
  return (
    <PagePlaceholder
      title="Reserve Your Stay"
      eyebrow="Reservations"
      subtitle="BOOK A ROOM"
      description="Select your check-in dates, guest count, and preferred suite for an unforgettable getaway. The reservation interface and booking flow foundation will be developed in a future phase."
      upcomingPhase="Phase 2 / Phase 3"
      suggestedLinks={[
        { label: 'Browse Rooms & Suites', path: '/rooms' },
        { label: 'View Facilities', path: '/facilities' },
        { label: 'Contact Reception', path: '/contact' },
      ]}
    />
  );
};
