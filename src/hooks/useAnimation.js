import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function useAnimation({
  callback,
  duration,
  enabled = true,
  offset,
}) {
  const offsetRef = useRef(0);
  const frame = useRef(0);
  const frames = Math.floor(1 / offset);
  const shift = duration / frames;

  useFrame(
    function update(_, delta) {
      if (!enabled) {
        if (frame.current) {
          frame.current = 0;
        }

        return;
      }

      const currentShift = frame.current - (frame.current % shift);
      const currentFrame = currentShift / shift;
      const currentOffset = currentFrame * offset;

      if (offsetRef.current !== currentOffset) {
        offsetRef.current = currentOffset;
        callback(offsetRef.current);
      }

      frame.current = (delta + frame.current) % duration;
    },
  );
}
