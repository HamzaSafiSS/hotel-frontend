import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#18324A] font-sans">
      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#062B45] focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
      >
        Skip to main content
      </a>

      {/* Global Shared Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <main id="main-content" className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Global Shared Footer */}
      <Footer />
    </div>
  );
};
