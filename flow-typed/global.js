// @flow

declare var __DEV__: boolean;
declare var __webpack_public_path__: string;

type Status =
  | 'idle'
  | 'check'
  | 'prepare'
  | 'ready'
  | 'dispose'
  | 'apply'
  | 'abort'
  | 'fail'
;

type ModuleResult = {
  type: string,
  chain?: Array<string>,
  id?: string,
  moduleId?: string,
  parentId?: string,
  outdatedModules?: Array<string>,
  outdatedDependencies?: Array<string>,
};

type HotOptions = {
  onDeclined(cb: (result: ModuleResult) => mixed): void,
  ignoreDeclined: boolean,
};

type Module = {
  hot?: {
    active: boolean,
    accept: {
      (): void,
      (cb: () => mixed): void,
      (dep: Array<string>, cb: () => mixed): void,
      (dep: string, cb: () => mixed): void,
    },
    decline: {
      (): void,
      (dep: Array<string>): void,
      (dep: string): void,
    },
    dispose(cb: (data: Object) => mixed): void,
    addDisposeHandler(cb: (data: Object) => mixed): void,
    removeDisposeHandler(cb: (data: Object) => mixed): void,

    check(autoApply: boolean | HotOptions): Promise<Array<string>> | null,
    apply(autoApply: boolean | HotOptions): Promise<Array<string>>,
    status: {
      ((Status) => mixed): void,
      (): Status,
    },
    addStatusHandler((Status) => mixed): void,
    removeStatusHandler((Status) => mixed): void,
    data: Object,
  },
};

declare var module: Module;
