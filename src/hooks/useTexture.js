import { useRef } from 'react';
import { CanvasTexture, NearestFilter } from 'three';

import { COLORS, TEXTURES } from '../data';

const cache = {};

export default function useTexture(name) {
  const canvas = useRef(document.createElement('canvas'));

  if (!TEXTURES.hasOwnProperty(name)) return null;

  function scale(x) {
    return x * devicePixelRatio;
  }

  function renderTexture({ height, paths, width }) {
    canvas.current.width = scale(width);
    canvas.current.height = scale(height);
    const ctx = canvas.current.getContext('2d');
    ctx.clearRect(0, 0, scale(width), scale(height));

    function renderPoint([x, y], index) {
      if (index) {
        ctx.lineTo(scale(x), scale(y));
      } else {
        ctx.moveTo(scale(x), scale(y));
      }
    }

    function renderPath({ begin, fill, fillRule, points, close = true }) {
      if (begin) {
        ctx.beginPath();
      }

      points.forEach(renderPoint);

      if (close) {
        ctx.closePath();
      }

      if (fill) {
        ctx.fillStyle = fill in COLORS ? COLORS[fill] : fill;
        ctx.fill(fillRule);
      }
    }

    paths.forEach(renderPath);
  }

  if (!cache.hasOwnProperty(name)) {
    renderTexture(TEXTURES[name]);
    const texture = new CanvasTexture(canvas.current);
    texture.repeat.set(devicePixelRatio, devicePixelRatio);
    texture.magFilter = NearestFilter;
    texture.minFilter = NearestFilter;
    cache[name] = texture;
  }

  return cache[name];
}
