import React from 'react';

import { Controls, Layout } from '../contexts';
import Background from './Background';
import Terrain from './Terrain';

export default function App() {
  return (
    <Controls.Provider>
      <Layout.Provider>
        <Background />
        <Terrain />
      </Layout.Provider>
    </Controls.Provider>
  );
}
