import { CanvasTexture, NearestFilter } from 'three';

import textures from '../textures';

const cache = {};

export default function useTexture(name) {
  if (!cache.hasOwnProperty(name)) {
    const texture = new CanvasTexture(textures[name]());
    texture.magFilter = NearestFilter;
    texture.minFilter = NearestFilter;
    cache[name] = texture;
  }

  return cache[name];
}
