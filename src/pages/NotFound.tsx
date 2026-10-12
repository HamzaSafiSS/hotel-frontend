import React from 'react';
import { PagePlaceholder } from '../components/ui/PagePlaceholder';

export const NotFound: React.FC = () => {
  return (
    <PagePlaceholder
      title="404 — Page Not Found"
      eyebrow="Navigation"
      subtitle="ERROR 404"
      description="The sanctuary you are looking for cannot be found or may have moved. Please return to the homepage or explore our curated rooms and amenities."
    />
  );
};
