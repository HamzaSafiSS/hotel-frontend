import React from 'react';
import { PagePlaceholder } from '../components/ui/PagePlaceholder';

export const Menu: React.FC = () => {
  return (
    <PagePlaceholder
      title="Digital Culinary Menu"
      eyebrow="Dining Selection"
      subtitle="DIGITAL MENU"
      description="Browse our seasonal breakfast, all-day dining, sunset cocktail, and in-room dining menus featuring fresh coastal catches, pasture-raised selections, and organic estate pairings."
      suggestedLinks={[
        { label: 'Dining Overview', path: '/dining' },
        { label: 'Book a Room', path: '/booking' },
        { label: 'Contact Us', path: '/contact' },
      ]}
    />
  );
};
