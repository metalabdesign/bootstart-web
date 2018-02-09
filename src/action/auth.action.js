// @flow

export type TokenStored = {
  type: 'auth/TOKEN_STORED',
  payload: {
    userId: string,
    roles: string[],
  },
};
export type TokenCleared = {
  type: 'auth/TOKEN_CLEARED',
};

export type LoginStarted = {
  type: 'auth/LOGIN_STARTED',
};
export type LoginEnded = {
  type: 'auth/LOGIN_ENDED',
};
export type LoginFailed = {
  type: 'auth/LOGIN_FAILED',
  payload: Error,
};
