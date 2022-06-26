import React from 'react';

import DPad from './DPad';
import Fire from './Fire';
import Start from './Start';

import { useStore } from '../../hooks/useStore';

function selector({ settings: { showOverlay } }) {
  return showOverlay;
}

export default function Overlay() {
  if (!useStore(selector)) return null;

  return (
    <>
      <DPad />
      <Fire />
      <Start />
    </>
  );
}
