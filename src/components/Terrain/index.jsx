import React, { useContext } from 'react';

import { Layout } from '../../contexts';

import { useTexture, useTextureAnimation } from '../../hooks';

import { BLOCK } from '../../constants';

function Brick({ position, unit }) {
  const texture = useTexture(BLOCK.BRICK);
  return (
    <sprite position={position} scale={[8 * unit, 8 * unit, 0]}>
      <spriteMaterial
        map={texture}
        sizeAttenuation
      />
    </sprite>
  );
}

function Steel({ position, unit }) {
  const texture = useTexture(BLOCK.STEEL);
  return (
    <sprite position={position} scale={[8 * unit, 8 * unit, 0]}>
      <spriteMaterial
        map={texture}
        sizeAttenuation
      />
    </sprite>
  );
}

function Tree({ position, unit }) {
  const texture = useTexture(BLOCK.TREE);
  return (
    <sprite position={position} scale={[8 * unit, 8 * unit, 0]}>
      <spriteMaterial
        map={texture}
        sizeAttenuation
      />
    </sprite>
  );
}

function Water({ position, unit }) {
  const texture = useTexture(BLOCK.WATER);
  useTextureAnimation({ duration: 1.25, offset: 0.5, texture });

  return (
    <sprite position={position} scale={[8 * unit, 8 * unit, 0]}>
      <spriteMaterial map={texture} />
    </sprite>
  );
}

export default function Terrain() {
  const { unit } = useContext(Layout.Context);
  return (
    <>
      <Brick position={[-4 * unit, 4 * unit, 0]} unit={unit} />
      <Tree position={[4 * unit, 4 * unit, 0]} unit={unit} />
      <Steel position={[-4 * unit, -4 * unit, 0]} unit={unit} />
      <Water position={[4 * unit, -4 * unit, 0]} unit={unit} />
    </>
  );
}
