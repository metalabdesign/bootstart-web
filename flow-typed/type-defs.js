/* @flow */
import type {Module} from '/types';
declare var module: Module;

declare module 'react-dom' {
  declare function hydrate<ElementType: React$ElementType>(
    element: React$Element<ElementType>,
    container: Element,
    callback?: () => void,
  ): React$ElementRef<ElementType>;
}

declare module 'flow-runtime' {
  declare type Type<T> = {
    assert: (input: any) => T,
  };
  declare var reify: any;
}

/*
note: this also needs to be added for ramda:
declare function chain<U, T> (
  f: (x: U) => Array<T>,
  ...rest: Array<void>
): (x: Array<U>) => Array<T>;
declare function chain<U, T> (
  f: (x: U) => Array<T>,
  u: Array<U>,
): Array<T>;
*/
