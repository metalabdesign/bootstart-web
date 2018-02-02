// @flow

import typeof Reducer from '/reducer';

type State = $Call<Reducer, *, *>;

const parseInitialState = (): State => {
  const stateContainer = document.getElementById('state');

  if (!stateContainer) {
    throw new Error('Could not extract initial state.');
  }

  // JSON.parse returns `any`, which is normally a dangerous type in flow that
  // should be further refined. However, we can trust that the parsed result
  // here is a serialized state object matching the `State` type.
  return (JSON.parse(stateContainer.textContent): State);
};

export default parseInitialState;
