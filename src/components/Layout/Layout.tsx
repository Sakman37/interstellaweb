import React from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingWhatsApp from '../FloatingWhatsApp';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen relative">
      {/* Star Field Background */}
      <div className="star-field" />
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Floating WhatsApp */}
      <FloatingWhatsApp />
    </div>
  );
};

export default Layout;