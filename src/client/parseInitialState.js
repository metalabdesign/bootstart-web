/* @flow */

import type {State} from '/reducer';

export default (context: *) => {
  const stateContainer = document.getElementById('state');

  if (!stateContainer) {
    throw new Error('Could not extract initial state.');
  }

  // JSON.parse returns `any`, which is normally a dangerous type in flow that
  // should be further refined. However, we can trust that the parsed result
  // here is a serialized state object matching the `State` type.
  const initialState: State = JSON.parse(stateContainer.textContent);

  return Object.freeze({...context, initialState});
};
