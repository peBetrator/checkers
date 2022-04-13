import { Canvas } from '@react-three/fiber';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './app';
import './styles.css';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(
  <StrictMode>
    <Canvas id="canvas">
      <App />
    </Canvas>
  </StrictMode>
);
