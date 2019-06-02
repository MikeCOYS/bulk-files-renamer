// @flow
import type { State } from './reducers/types';

export function loadState() {
  try {
    const serializedState = localStorage.getItem('state') || '{}';

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

export function saveState(state: State) {
  try {
    const serializedState = JSON.stringify(state);

    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.error(`Error saving state: ${err}`);
  }
}
