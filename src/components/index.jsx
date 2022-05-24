import React from 'react';

import Overlay from './Overlay';
import Game from './Game';

import { Controls, Layout } from '../contexts';

export default function App() {
  return (
    <Controls.Provider>
      <Layout.Provider>
        <Game />
        <Overlay />
      </Layout.Provider>
    </Controls.Provider>
  );
}
