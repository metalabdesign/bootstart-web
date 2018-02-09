// @flow

// Import modules ==============================================================
import type {Action as RouterAction} from 'react-router-redux';

// Import actions ==============================================================
import type {
  TokenStored,
  TokenCleared,
  LoginStarted,
  LoginEnded,
  LoginFailed,
} from './auth.action';

export type Action =
  // npm/react-router-redux
  | RouterAction

  // action/auth
  | TokenStored
  | TokenCleared
  | LoginStarted
  | LoginEnded
  | LoginFailed
;
