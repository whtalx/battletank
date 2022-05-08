import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function useTextureAnimation({ axis = 'x', duration, offset, texture }) {
  const frames = Math.floor(1 / offset);
  const shift = duration / frames;
  const frame = useRef(0);
  texture.repeat[axis] = offset;

  useFrame((_, delta) => {
    const currentShift = frame.current - (frame.current % shift);
    const currentFrame = currentShift / shift;
    const currentOffset = currentFrame * offset;

    if (texture.offset[axis] !== currentOffset) {
      texture.offset[axis] = currentOffset;
    }

    frame.current = (delta + frame.current) % duration;
  });
}
