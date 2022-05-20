import { createElement } from 'react';
import { createRoot, events } from '@react-three/fiber';
import { OrthographicCamera } from 'three';

import App from './components';

import { preventDefault } from './utils';

export function render(canvas) {
  function getSize() {
    return { width: window.innerWidth, height: window.innerHeight };
  }

  canvas.addEventListener('contextmenu', preventDefault());
  const camera = new OrthographicCamera(0, 0, 0, 0, 1, 100);
  camera.position.z = 100;
  const root = createRoot(canvas);
  root.configure({ camera, events, gl: { alpha: false, antialias: false }, size: getSize() });
  root.render(createElement(App));

  window.addEventListener('resize', function handleResize() {
    root.configure({ size: getSize() });
  });
}