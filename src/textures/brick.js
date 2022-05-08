import { COLORS } from '../constants';

export default function brick() {
  const canvas = document.createElement('canvas');
  canvas.width = 16;
  canvas.height = 16;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = COLORS['17'];
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(16, 0);
  ctx.lineTo(16, 2);
  ctx.lineTo(10, 2);
  ctx.lineTo(10, 8);
  ctx.lineTo(16, 8);
  ctx.lineTo(16, 10);
  ctx.lineTo(3, 10);
  ctx.lineTo(3, 15);
  ctx.lineTo(1, 15);
  ctx.lineTo(1, 8);
  ctx.lineTo(8, 8);
  ctx.lineTo(8, 2);
  ctx.lineTo(0, 2);
  ctx.lineTo(0, 0);
  ctx.lineTo(16, 0);
  ctx.closePath();
  ctx.fillStyle = COLORS['06'];
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(6, 6);
  ctx.lineTo(7, 6);
  ctx.lineTo(7, 1);
  ctx.lineTo(6, 1);
  ctx.lineTo(6, 0);
  ctx.lineTo(9, 0);
  ctx.lineTo(9, 1);
  ctx.lineTo(8, 1);
  ctx.lineTo(8, 6);
  ctx.lineTo(9, 6);
  ctx.lineTo(9, 7);
  ctx.lineTo(16, 7);
  ctx.lineTo(16, 9);
  ctx.lineTo(15, 9);
  ctx.lineTo(15, 8);
  ctx.lineTo(2, 8);
  ctx.lineTo(2, 9);
  ctx.lineTo(1, 9);
  ctx.lineTo(1, 14);
  ctx.lineTo(2, 14);
  ctx.lineTo(2, 15);
  ctx.lineTo(15, 15);
  ctx.lineTo(15, 14);
  ctx.lineTo(16, 14);
  ctx.lineTo(16, 16);
  ctx.lineTo(0, 16);
  ctx.lineTo(0, 7);
  ctx.lineTo(6, 7);
  ctx.lineTo(6, 6);
  ctx.closePath();
  ctx.fillStyle = COLORS['00'];
  ctx.fill();

  return canvas;
}
