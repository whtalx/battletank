function init({ render }) {
  const canvas = document.createElement('canvas');
  canvas.id = 'canvas';
  document.body.prepend(canvas);
  render(canvas);
}

import('./app').then(init);
