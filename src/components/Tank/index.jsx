import React from 'react';
import { PLAYER } from '../../constants';

import Player from './Player';

export default function Tank(props) {
  switch (props.type) {
    case PLAYER.TYPE.BASIC:
    case PLAYER.TYPE.DOUBLE_SHOT:
    case PLAYER.TYPE.FAST_SHOT:
    case PLAYER.TYPE.POWER_SHOT: {
      const { direction, index, position, shield, type } = props;
      return (
        <Player
          direction={direction}
          index={index}
          position={position}
          shield={shield}
          type={type}
        />
      );
    }

    default: {
      return null;
    }
  }
}
