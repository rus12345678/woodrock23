import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { InquiryProvider } from './context/InquiryContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CategoryRibbon } from './components/common/CategoryRibbon';
import { InquiryModal } from './components/common/InquiryModal';

import { HomePage } from './pages/HomePage';
import { DesignPage } from './pages/DesignPage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { SolutionDetailPage } from './pages/SolutionDetailPage';
import { HowWeWorkPage } from './pages/HowWeWorkPage';
import { ContactsPage } from './pages/ContactsPage';

// Helper to scroll to top on page navigation
const ScrollToTop: React.FC = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Only scroll to top if not targeting an in-page hash anchor
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, search]);

  return null;
};

export const App: React.FC = () => {
  return (
    <InquiryProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
          {/* Main Global Header */}
          <Header />

          {/* Sub-nav Category Ribbon (DJI inspired horizontal strip) */}
          <CategoryRibbon />

          {/* Main Routed Page Content */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/design" element={<DesignPage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/catalog/:id" element={<ProductDetailPage />} />
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/solutions/:id" element={<SolutionDetailPage />} />
              <Route path="/how-we-work" element={<HowWeWorkPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />

          {/* Global Accessible Inquiry Modal */}
          <InquiryModal />
        </div>
      </BrowserRouter>
    </InquiryProvider>
  );
};

export default App;
