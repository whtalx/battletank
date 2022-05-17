import React from 'react';

import Game from './Game';
import { Controls, Layout } from '../contexts';

export default function App() {
  return (
    <Controls.Provider>
      <Layout.Provider>
        <Game />
      </Layout.Provider>
    </Controls.Provider>
  );
}
