import { useEffect, useState } from "react";

const NotFound = () => {
  const [stars, setStars] = useState<Array<{ id: number; left: number; top: number; delay: number }>>([]);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      window.location.pathname
    );
  }, []);

  useEffect(() => {
    // Create animated stars
    const numberOfStars = 50;
    const starArray = Array.from({ length: numberOfStars }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3
    }));
    setStars(starArray);

    // Optional: Redirect after 10 seconds if no interaction
    const redirectTimer = setTimeout(() => {
      if (!document.hidden) {
        window.location.href = '/';
      }
    }, 10000);

    return () => clearTimeout(redirectTimer);
  }, []);

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-5 overflow-hidden"
         style={{
           background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3a 100%)',
           color: '#e5e5e7',
           fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
         }}>
      
      {/* Floating Stars */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-[-1]">
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute w-0.5 h-0.5 rounded-full animate-pulse"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              background: '#6366f1',
              animationDelay: `${star.delay}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-[-1]">
        <div 
          className="absolute w-20 h-20 rounded-full animate-bounce"
          style={{
            top: '10%',
            left: '10%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3), transparent)',
            animationDelay: '0s',
            animationDuration: '6s'
          }}
        />
        <div 
          className="absolute w-15 h-15 rounded-full animate-bounce"
          style={{
            top: '60%',
            right: '15%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3), transparent)',
            animationDelay: '2s',
            animationDuration: '6s'
          }}
        />
        <div 
          className="absolute w-10 h-10 rounded-full animate-bounce"
          style={{
            top: '30%',
            right: '25%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3), transparent)',
            animationDelay: '4s',
            animationDuration: '6s'
          }}
        />
      </div>
      
      <div className="text-center max-w-2xl w-full">
        {/* Cosmic 404 Animation */}
        <div className="relative w-70 h-70 sm:w-56 sm:h-56 mx-auto mb-12"
             style={{ perspective: '200px' }}>
          
          {/* Orbit rings */}
          <div 
            className="absolute top-1/2 left-1/2 border-solid rounded-full animate-spin"
            style={{
              width: '180px',
              height: '180px',
              marginTop: '-90px',
              marginLeft: '-90px',
              borderWidth: '6px',
              borderColor: '#6366f1 transparent #6366f1 transparent',
              transform: 'rotateX(60deg) rotateY(20deg) rotateZ(0deg)',
              animationDuration: '3s',
              animationTimingFunction: 'cubic-bezier(0.49, 0.06, 0.43, 0.85)',
              animationDelay: '0s'
            }}
          />
          
          <div 
            className="absolute top-1/2 left-1/2 border-solid rounded-full animate-spin"
            style={{
              width: '220px',
              height: '220px',
              marginTop: '-110px',
              marginLeft: '-110px',
              borderWidth: '4px',
              borderColor: '#a855f7 transparent #a855f7 transparent',
              transform: 'rotateX(60deg) rotateY(20deg) rotateZ(120deg)',
              animationDuration: '3s',
              animationTimingFunction: 'cubic-bezier(0.49, 0.06, 0.43, 0.85)',
              animationDelay: '300ms'
            }}
          />
          
          <div 
            className="absolute top-1/2 left-1/2 border-solid rounded-full animate-spin"
            style={{
              width: '260px',
              height: '260px',
              marginTop: '-130px',
              marginLeft: '-130px',
              borderWidth: '3px',
              borderColor: '#ec4899 transparent #ec4899 transparent',
              transform: 'rotateX(60deg) rotateY(20deg) rotateZ(240deg)',
              animationDuration: '3s',
              animationTimingFunction: 'cubic-bezier(0.49, 0.06, 0.43, 0.85)',
              animationDelay: '600ms'
            }}
          />

          {/* Center 404 */}
          <div 
            className="absolute top-1/2 left-1/2 w-30 h-30 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-4xl sm:text-3xl font-black text-white animate-pulse"
            style={{
              marginTop: '-60px',
              marginLeft: '-60px',
              background: 'radial-gradient(circle, #6366f1, #a855f7, #ec4899)',
              boxShadow: `
                0 0 30px rgba(99, 102, 241, 0.5),
                0 0 60px rgba(168, 85, 247, 0.3),
                0 0 90px rgba(236, 72, 153, 0.2)
              `,
              textShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
            }}
          >
            404
          </div>
        </div>
        
        {/* Message Card */}
        <div 
          className="rounded-2xl p-12 sm:p-8 mb-8"
          style={{
            background: 'rgba(30, 41, 59, 0.3)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(71, 85, 105, 0.3)',
            boxShadow: `
              0 0 0 1px rgba(99, 102, 241, 0.1),
              0 10px 30px rgba(0, 0, 0, 0.3)
            `
          }}
        >
          <h1 
            className="text-4xl sm:text-3xl font-bold mb-4 animate-pulse"
            style={{
              background: 'linear-gradient(45deg, #6366f1, #a855f7, #ec4899)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.1em'
            }}
          >
            PÁGINA NO ENCONTRADA
          </h1>
          
          <p 
            className="text-xl sm:text-lg mb-8 leading-relaxed"
            style={{ color: '#94a3b8' }}
          >
            Esta página se perdió en el espacio interestelar. 
            Te ayudamos a regresar a territorio conocido.
          </p>
          
          {/* Buttons */}
          <div className="flex gap-4 justify-center flex-wrap sm:flex-col sm:items-center">
            <a 
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 sm:w-full sm:max-w-xs"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                color: 'white'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
              Ir al inicio
            </a>
            
            <button 
              onClick={handleGoBack}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-lg border-2 transition-all duration-300 transform hover:-translate-y-1 sm:w-full sm:max-w-xs"
              style={{
                background: 'transparent',
                borderColor: 'rgba(168, 85, 247, 0.5)',
                color: '#a855f7'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(168, 85, 247, 0.1)';
                e.currentTarget.style.borderColor = '#a855f7';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)';
              }}
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/>
              </svg>
              Regresar
            </button>
          </div>
        </div>
      </div>


    </div>
  );
};

export default NotFound;