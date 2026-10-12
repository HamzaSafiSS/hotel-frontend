import React from 'react';
import { PagePlaceholder } from '../components/ui/PagePlaceholder';

export const Dining: React.FC = () => {
  return (
    <PagePlaceholder
      title="Fine Dining & Culinary Delights"
      eyebrow="Gastronomy"
      subtitle="DINING EXPERIENCES"
      description="Savor exquisite international and coastal cuisine crafted by award-winning chefs using locally sourced organic ingredients. Restaurant previews, chef specials, and dining reservations will be developed in an upcoming phase."
      upcomingPhase="Phase 2 / Phase 3"
      suggestedLinks={[
        { label: 'View Digital Menu', path: '/menu' },
        { label: 'Explore Rooms', path: '/rooms' },
        { label: 'Contact Concierge', path: '/contact' },
      ]}
    />
  );
};
