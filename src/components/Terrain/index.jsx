import React, { useContext } from 'react';

import { Layout } from '../../contexts';

import { useTexture, useTextureAnimation } from '../../hooks';

import { BLOCK } from '../../constants';

function Brick({ position, size }) {
  const texture = useTexture(BLOCK.BRICK);
  return (
    <sprite position={position} scale={[size, size, 0]}>
      <spriteMaterial
        map={texture}
        sizeAttenuation
      />
    </sprite>
  );
}

function Steel({ position, size }) {
  const texture = useTexture(BLOCK.STEEL);
  const [x, y, z] = position;

  return (
    <sprite position={[x + size, y, z]} scale={[size, size, 0]}>
      <spriteMaterial
        map={texture}
        sizeAttenuation
      />
    </sprite>
  );
}

function Tree({ position, size }) {
  const texture = useTexture(BLOCK.TREE);
  const [x, y] = position;

  return (
    <sprite position={[x + size * 2, y, 3]} scale={[size, size, 0]}>
      <spriteMaterial
        map={texture}
        sizeAttenuation
      />
    </sprite>
  );
}

function Water({ position, size }) {
  const texture = useTexture(BLOCK.WATER);
  useTextureAnimation({ duration: 1.25, offset: 0.5, texture });
  const [x, y, z] = position;

  return (
    <sprite position={[x + size * 3, y, z]} scale={[size, size, 0]}>
      <spriteMaterial map={texture} />
    </sprite>
  );
}

export default function Terrain() {
  const { block } = useContext(Layout.Context);
  return (
    <>
      <Brick {...block} />
      <Steel {...block} />
      <Tree {...block} />
      <Water {...block} />
    </>
  );
}
