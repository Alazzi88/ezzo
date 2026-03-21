import React from 'react';
import styled from 'styled-components';

const Pattern = () => {
  return (
    <StyledWrapper>
      <div className="container" />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  .container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: radial-gradient(
        ellipse at 20% 30%,
        rgba(251, 146, 60, 0.7) 0%,
        rgba(251, 146, 60, 0) 60%
      ),
      radial-gradient(
        ellipse at 80% 50%,
        rgba(251, 191, 36, 0.5) 0%,
        rgba(251, 191, 36, 0) 70%
      ),
      radial-gradient(
        ellipse at 50% 80%,
        rgba(255, 115, 179, 0.3) 0%,
        rgba(255, 115, 179, 0) 65%
      ),
      linear-gradient(135deg, #0a0520 0%, #18181b 100%);
    background-blend-mode: overlay, screen, hard-light;
    overflow: hidden;
    animation: aurora-drift 25s infinite alternate ease-in-out;
  }
  .container::before {
    content: "";
    position: absolute;
    width: 200%;
    height: 200%;
    top: -50%;
    left: -50%;
    background: repeating-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.02) 0px,
        rgba(255, 255, 255, 0.02) 1px,
        transparent 1px,
        transparent 40px
      ),
      repeating-linear-gradient(
        -45deg,
        rgba(255, 255, 255, 0.03) 0px,
        rgba(255, 255, 255, 0.03) 1px,
        transparent 1px,
        transparent 60px
      );
    animation: grid-shift 20s linear infinite;
  }
  .container::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at center,
      transparent 70%,
      rgba(10, 5, 32, 0.9) 100%
    );
    animation: aurora-pulse 8s infinite alternate;
  }
  @keyframes aurora-drift {
    0% {
      background-position:
        0% 0%,
        0% 0%,
        0% 0%;
      filter: hue-rotate(0deg) brightness(1);
    }
    50% {
      background-position:
        -10% -5%,
        5% 10%,
        0% 15%;
      filter: hue-rotate(15deg) brightness(1.1);
    }
    100% {
      background-position:
        5% 10%,
        -10% -5%,
        15% 0%;
      filter: hue-rotate(30deg) brightness(1);
    }
  }
  @keyframes grid-shift {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-50%, -50%);
    }
  }
  @keyframes aurora-pulse {
    0% {
      opacity: 0.8;
      transform: scale(1);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.05);
    }
    100% {
      opacity: 0.8;
      transform: scale(1);
    }
  }
`;

export default Pattern;
