import React from 'react';

const InterstellaLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="loader-container">
        <div className="cosmic-loader">
          <div className="orbit orbit-1"></div>
          <div className="orbit orbit-2"></div>
          <div className="orbit orbit-3"></div>
          <div className="center-core"></div>
        </div>
        <div className="loading-text">
          <span>INTERSTELLA</span>
          <div className="loading-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .cosmic-loader {
          position: relative;
          width: 200px;
          height: 200px;
          perspective: 200px;
        }

        .orbit {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          border-style: solid;
          transform-origin: 50% 50%;
          animation-timing-function: cubic-bezier(0.49, 0.06, 0.43, 0.85);
          animation-iteration-count: infinite;
          animation-duration: 2000ms;
        }

        .orbit-1 {
          width: 120px;
          height: 120px;
          margin-top: -60px;
          margin-left: -60px;
          border-width: 8px;
          border-color: #ff6b35 transparent #ff6b35 transparent;
          transform: rotateX(60deg) rotateY(20deg) rotateZ(0deg);
          animation-name: orbit1;
        }

        .orbit-2 {
          width: 140px;
          height: 140px;
          margin-top: -70px;
          margin-left: -70px;
          border-width: 6px;
          border-color: #e91e63 transparent #e91e63 transparent;
          transform: rotateX(60deg) rotateY(20deg) rotateZ(120deg);
          animation-name: orbit2;
          animation-delay: 200ms;
        }

        .orbit-3 {
          width: 160px;
          height: 160px;
          margin-top: -80px;
          margin-left: -80px;
          border-width: 4px;
          border-color: #9c27b0 transparent #9c27b0 transparent;
          transform: rotateX(60deg) rotateY(20deg) rotateZ(240deg);
          animation-name: orbit3;
          animation-delay: 400ms;
        }

        .center-core {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 40px;
          height: 40px;
          margin-top: -20px;
          margin-left: -20px;
          border-radius: 50%;
          background: radial-gradient(circle, #ff6b35, #e91e63, #9c27b0);
          box-shadow: 
            0 0 20px rgba(255, 107, 53, 0.5),
            0 0 40px rgba(233, 30, 99, 0.3),
            0 0 60px rgba(156, 39, 176, 0.2);
          animation: pulse 1.5s ease-in-out infinite;
        }

        .loading-text {
          text-align: center;
          color: white;
        }

        .loading-text span {
          font-family: 'Arial', sans-serif;
          font-size: 1.5rem;
          font-weight: bold;
          letter-spacing: 0.3em;
          background: linear-gradient(45deg, #ff6b35, #e91e63, #9c27b0);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shift 3s ease-in-out infinite;
        }

        .loading-dots {
          display: inline-flex;
          margin-left: 0.5rem;
        }

        .loading-dots span {
          font-size: 2rem;
          animation: bounce 1.4s ease-in-out infinite both;
          -webkit-text-fill-color: #ff6b35;
        }

        .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
        .loading-dots span:nth-child(2) { animation-delay: -0.16s; }
        .loading-dots span:nth-child(3) { animation-delay: 0s; }

        @keyframes orbit1 {
          0% {
            transform: rotateX(60deg) rotateY(20deg) rotateZ(0deg);
            border-color: #ff6b35 transparent #ff6b35 transparent;
          }
          33% {
            transform: rotateX(40deg) rotateY(40deg) rotateZ(120deg);
            border-color: #ff8f65 transparent #ff8f65 transparent;
          }
          66% {
            transform: rotateX(20deg) rotateY(60deg) rotateZ(240deg);
            border-color: #ffb395 transparent #ffb395 transparent;
          }
          100% {
            transform: rotateX(60deg) rotateY(20deg) rotateZ(360deg);
            border-color: #ff6b35 transparent #ff6b35 transparent;
          }
        }

        @keyframes orbit2 {
          0% {
            transform: rotateX(60deg) rotateY(20deg) rotateZ(120deg);
            border-color: #e91e63 transparent #e91e63 transparent;
          }
          33% {
            transform: rotateX(40deg) rotateY(40deg) rotateZ(240deg);
            border-color: #ed4c7c transparent #ed4c7c transparent;
          }
          66% {
            transform: rotateX(20deg) rotateY(60deg) rotateZ(360deg);
            border-color: #f17a95 transparent #f17a95 transparent;
          }
          100% {
            transform: rotateX(60deg) rotateY(20deg) rotateZ(480deg);
            border-color: #e91e63 transparent #e91e63 transparent;
          }
        }

        @keyframes orbit3 {
          0% {
            transform: rotateX(60deg) rotateY(20deg) rotateZ(240deg);
            border-color: #9c27b0 transparent #9c27b0 transparent;
          }
          33% {
            transform: rotateX(40deg) rotateY(40deg) rotateZ(360deg);
            border-color: #af52bf transparent #af52bf transparent;
          }
          66% {
            transform: rotateX(20deg) rotateY(60deg) rotateZ(480deg);
            border-color: #c27dce transparent #c27dce transparent;
          }
          100% {
            transform: rotateX(60deg) rotateY(20deg) rotateZ(600deg);
            border-color: #9c27b0 transparent #9c27b0 transparent;
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 
              0 0 20px rgba(255, 107, 53, 0.5),
              0 0 40px rgba(233, 30, 99, 0.3),
              0 0 60px rgba(156, 39, 176, 0.2);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 
              0 0 30px rgba(255, 107, 53, 0.8),
              0 0 60px rgba(233, 30, 99, 0.5),
              0 0 90px rgba(156, 39, 176, 0.3);
          }
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default InterstellaLoader;