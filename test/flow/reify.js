/* @flow */

import {reify} from 'flow-runtime';
import type {Type} from 'flow-runtime';

type User = {
  username: string,
  age: number,
};

const json = {foo: 5};
const user = (reify: Type<User>).assert(json);

// $ExpectError
user.x;
