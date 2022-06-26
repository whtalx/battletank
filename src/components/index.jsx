import React from 'react';

import Overlay from './Overlay';
import Game from './Game';

import { Controls } from '../contexts/controls';
import { Layout } from '../contexts/layout';

export default function App() {
  return (
    <Controls.Wrapper>
      <Layout.Wrapper>
        <Game />
        <Overlay />
      </Layout.Wrapper>
    </Controls.Wrapper>
  );
}
