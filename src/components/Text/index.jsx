import React from 'react';

import { getCharacterScale, getCharacterShape, getCharacterSize } from '../../utils/font';

import LAYOUT from '../../constants/layout';

function getProps({
  center = false,
  color = null,
  lineHeight = 1.125,
  position = [0, 0, 0],
  fontSize = 8,
  text = '',
  texture = null,
  unit = 1,
}) {
  const height = fontSize * unit * lineHeight;

  function renderLine(props, line, lineIndex, lines) {
    function renderCharacter(result, character, characterIndex) {
      if (!character) return result;

      const shape = getCharacterShape(character);
      const characterSize = getCharacterSize(character);
      const characterPosition = [result.width, 0, LAYOUT.Z_INDEX.TEXT];
      const characterScale = getCharacterScale({
        characterSize,
        fontSize,
        unit,
      });

      result.width += characterScale[0] * characterSize[0];

      if (shape) {
        result.characters.push(
          <mesh
            key={`c-${characterIndex}`}
            position={characterPosition}
            scale={characterScale}
          >
            <shapeGeometry args={[shape]} />
            <meshBasicMaterial color={color} map={texture} />
          </mesh>,
        );
      }

      return result;
    }

    const { characters, width } = line
      .split('')
      .reduce(renderCharacter, { characters: [], width: 0 });

    const linePosition = [
      center ? -width / 2 : 0,
      -lineIndex * height,
      LAYOUT.Z_INDEX.TEXT,
    ];

    props.children.push(
      <group key={`l-${lineIndex}`} position={linePosition}>
        {characters}
      </group>,
    );

    if (!center) {
      props.width = Math.max(props.width, width);
    }

    if (lineIndex === lines.length - 1) {
      if (!center) {
        props.position[0] -= props.width / 2;
      }

      props.height = lineIndex * height - fontSize * unit;
      props.position[1] += props.height / 2;
    }

    return props;
  }

  return text
    .split('\n')
    .reduce(renderLine, { children: [], width: 0, height: 0, position });
}

export default function Text(props) {
  const { position, children } = getProps(props);
  return (
    <group position={position}>
      {children}
    </group>
  );
}
