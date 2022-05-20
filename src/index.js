function init({ render }) {
  const canvas = document.createElement('canvas');
  canvas.id = 'canvas';
  document.getElementById('loader').remove();
  document.body.appendChild(canvas);
  render(canvas);
}

import('./app').then(init);
