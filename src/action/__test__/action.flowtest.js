// @flow

import type {Action} from '../';

({type: '@@router/CALL_HISTORY_METHOD', payload: {method: 'push'}}: Action);

// $ExpectError
({type: '@@router/CALL_HISTORY_METHOD', payload: {method: 'foo'}}: Action);
