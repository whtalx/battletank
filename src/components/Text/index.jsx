import React from 'react';

import { getCharacterSize, getFontShape } from '../../utils';

import { COLORS } from '../../data';

function getProps({
  center = false,
  color = COLORS['0D'],
  lineHeight = 1.125,
  position = [0, 0, 0],
  size = 8,
  text = '',
  texture = null,
  unit = 1,
}) {
  const height = -size * unit * lineHeight;

  function renderLine(props, line, lineIndex, lines) {
    function renderCharacter(result, character, characterIndex) {
      if (!character) return result;

      const shape = getFontShape(character);
      const characterSize = getCharacterSize(character);
      const positionX = result.width;
      const scale = [
        ((size * characterSize[0] / characterSize[1]) / characterSize[0]) * unit,
        (size / characterSize[1]) * unit,
      ];

      result.width += scale[0] * characterSize[0];

      if (shape) {
        result.characters.push(
          <mesh key={`c-${characterIndex}`} position={[positionX, 0, 0]} scale={scale}>
            <shapeBufferGeometry args={[shape]} />
            <meshBasicMaterial color={color} map={texture} />
          </mesh>,
        );
      }

      return result;
    }

    const { characters, width } = line.split('').reduce(renderCharacter, { characters: [], width: 0 });
    const x = center ? -width / 2 : 0;
    const y = lineIndex * height;

    props.children.push(
      <group key={`l-${lineIndex}`} position={[x, y, 0]}>
        {characters}
      </group>,
    );

    if (!center) {
      props.maximum = Math.max(props.maximum, width);
    }

    if (lineIndex === lines.length - 1) {
      if (!center) {
        props.position[0] -= props.maximum / 2;
      }

      props.position[1] -= (height * lines.length) / 2;
    }

    return props;
  }

  return text.split('\\n').reduce(renderLine, { children: [], maximum: 0, position });
}

export default function Text(props) {
  const { position, children } = getProps(props);
  return (
    <group position={position}>
      {children}
    </group>
  );
}
