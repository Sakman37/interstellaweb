// hooks/usePageTransition.js
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageTransition = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Si es la carga inicial, no mostrar loader
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }

    // Mostrar loader al cambiar de ruta
    setIsLoading(true);
    
    // Reiniciar scroll al inicio de la página
    window.scrollTo(0, 0);
    
    // Simular tiempo de carga para mostrar el loader
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Ajusta este tiempo según necesites

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return { isLoading };
};



