import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { ScrollToTop } from './components/common/ScrollToTop';

// Pages
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

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
