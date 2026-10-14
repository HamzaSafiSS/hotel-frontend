import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HotelStoreProvider } from './store/hotelStore';
import { MainLayout } from './layouts/MainLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { ScrollToTop } from './components/common/ScrollToTop';

// Public Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Rooms } from './pages/Rooms';
import { RoomDetail } from './pages/RoomDetail';
import { Facilities } from './pages/Facilities';
import { Dining } from './pages/Dining';
import { Menu } from './pages/Menu';
import { Booking } from './pages/Booking';
import { Gallery } from './pages/Gallery';
import { Experiences } from './pages/Experiences';
import { Reviews } from './pages/Reviews';
import { FAQs } from './pages/FAQs';
import { Location } from './pages/Location';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { NotFound } from './pages/NotFound';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminRooms } from './pages/admin/AdminRooms';
import { AdminBookings } from './pages/admin/AdminBookings';
import { AdminDining } from './pages/admin/AdminDining';
import { AdminFacilities } from './pages/admin/AdminFacilities';
import { AdminGallery } from './pages/admin/AdminGallery';
import { AdminExperiences } from './pages/admin/AdminExperiences';
import { AdminReviews } from './pages/admin/AdminReviews';
import { AdminFAQs } from './pages/admin/AdminFAQs';
import { AdminEnquiries } from './pages/admin/AdminEnquiries';
import { AdminContent } from './pages/admin/AdminContent';
import { AdminSettings } from './pages/admin/AdminSettings';

export const App: React.FC = () => {
  return (
    <HotelStoreProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="rooms/:roomId" element={<RoomDetail />} />
            <Route path="facilities" element={<Facilities />} />
            <Route path="dining" element={<Dining />} />
            <Route path="menu" element={<Menu />} />
            <Route path="booking" element={<Booking />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="experiences" element={<Experiences />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="testimonials" element={<Reviews />} />
            <Route path="faqs" element={<FAQs />} />
            <Route path="location" element={<Location />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Admin Dashboard Routes (Accessed via /admin, separate layout) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="rooms" element={<AdminRooms />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="dining" element={<AdminDining />} />
            <Route path="facilities" element={<AdminFacilities />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="experiences" element={<AdminExperiences />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="faqs" element={<AdminFAQs />} />
            <Route path="enquiries" element={<AdminEnquiries />} />
            <Route path="content" element={<AdminContent />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HotelStoreProvider>
  );
};

export default App;
