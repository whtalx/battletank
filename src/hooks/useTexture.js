import { useRef } from 'react';
import { CanvasTexture, NearestFilter, RepeatWrapping } from 'three';

import { COLORS, TEXTURES } from '../data';

const cache = {};

export default function useTexture(name) {
  const canvas = useRef(document.createElement('canvas'));

  if (!TEXTURES.hasOwnProperty(name)) return null;

  function renderTexture({ height, paths, width }) {
    canvas.current.width = width;
    canvas.current.height = height;
    const ctx = canvas.current.getContext('2d');
    ctx.clearRect(0, 0, width, height);

    function renderPoint([x, y], index) {
      if (index) {
        ctx.lineTo(x, y);
      } else {
        ctx.moveTo(x, y);
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
        ctx.fillStyle = COLORS[fill];
        ctx.fill(fillRule);
      }
    }

    paths.forEach(renderPath);
  }

  if (!cache.hasOwnProperty(name)) {
    renderTexture(TEXTURES[name]);
    const texture = new CanvasTexture(canvas.current);
    texture.magFilter = NearestFilter;
    texture.minFilter = NearestFilter;
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    cache[name] = texture;
  }

  return cache[name];
}
