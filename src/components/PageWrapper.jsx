// components/PageWrapper.jsx
import React from 'react';
import { usePageTransition } from '@/hooks/usePageTransition';
import InterstellaLoader from './InterstellaLoader';

const PageWrapper = ({ children }) => {
  const { isLoading } = usePageTransition();

  return (
    <>
      {isLoading && <InterstellaLoader />}
      <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </>
  );
};

export default PageWrapper;