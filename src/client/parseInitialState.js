/* @flow */
import type {State} from '/types';

/**
 * Parse the serialized Redux store state provided by the server.
 *
 * @returns {?State} The redux store state.
 */
const parseInitialState = (): ?State => {
  try {
    const stateContainer = document.getElementById('state');
    const initialState = stateContainer ?
      JSON.parse(stateContainer.textContent) : undefined;
    return initialState;
  } catch (err) {
    return undefined;
  }
};

export default parseInitialState;
