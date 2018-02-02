// @flow

import {combineReducers} from 'redux';

import type {Action} from '/action';

type UserId = string | null;

const userId = (state: UserId = null, action: Action): UserId => {
  switch (action.type) {
  case 'auth/TOKEN_STORED': return action.payload.userId;
  case 'auth/TOKEN_CLEARED': return null;
  default: return state;
  }
};

export type Roles = Array<string>;

const roles = (state: Roles = [], action: Action): Roles => {
  switch (action.type) {
  case 'auth/TOKEN_STORED': return action.payload.roles;
  case 'auth/TOKEN_CLEARED': return [];
  default: return state;
  }
};

export default combineReducers({
  userId,
  roles,
});
