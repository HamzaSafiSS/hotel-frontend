import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calendar, Users, BedDouble, Search } from 'lucide-react';
import { PagePlaceholder } from '../components/ui/PagePlaceholder';
import { ContentContainer } from '../components/ui/ContentContainer';

export const Rooms: React.FC = () => {
  const [searchParams] = useSearchParams();
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const adults = searchParams.get('adults');
  const children = searchParams.get('children');
  const rooms = searchParams.get('rooms');

  const hasSearchParams = Boolean(checkIn || checkOut || adults || rooms);

  return (
    <div className="flex-1 flex flex-col">
      {hasSearchParams && (
        <div className="bg-[#EAF2FF] border-b border-[#D8E0EA] py-3.5">
          <ContentContainer size="lg">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#062B45]">
              <div className="flex items-center gap-2 font-semibold">
                <Search className="w-4 h-4 text-[#C7A66B]" />
                <span>Search Criteria Received from Homepage:</span>
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-medium">
                {checkIn && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#C7A66B]" />
                    In: {checkIn}
                  </span>
                )}
                {checkOut && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#C7A66B]" />
                    Out: {checkOut}
                  </span>
                )}
                {adults && (
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#C7A66B]" />
                    {adults} {adults === '1' ? 'Adult' : 'Adults'}
                  </span>
                )}
                {children && children !== '0' && (
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#C7A66B]" />
                    {children} {children === '1' ? 'Child' : 'Children'}
                  </span>
                )}
                {rooms && (
                  <span className="flex items-center gap-1">
                    <BedDouble className="w-3.5 h-3.5 text-[#C7A66B]" />
                    {rooms} {rooms === '1' ? 'Room' : 'Rooms'}
                  </span>
                )}
              </div>
            </div>
          </ContentContainer>
        </div>
      )}

      <PagePlaceholder
        title="Rooms & Suites Collection"
        eyebrow="Accommodations"
        subtitle="ROOMS & SUITES"
        description="Explore our curated collection of deluxe rooms, ocean-view suites, and private pool villas tailored for relaxation, rejuvenation, and unmatched comfort. The full catalog and filtering system will be developed in an upcoming phase."
        upcomingPhase="Phase 3"
      />
    </div>
  );
};
