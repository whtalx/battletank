import React from 'react';

import { Controls, Layout } from '../contexts';
import Background from './Background';
import Terrain from './Terrain';

import { MAPS } from '../data';

export default function App() {
  return (
    <Controls.Provider>
      <Layout.Provider>
        <Background />
        <Terrain levelMap={MAPS[0]} />
      </Layout.Provider>
    </Controls.Provider>
  );
}
