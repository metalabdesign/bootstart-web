// @flow

declare var module: {
  hot?: {
    accept(x: string, f: () => mixed): void,
    addStatusHandler(('idle' | 'check' | 'prepare' | 'ready' | 'dispose' | 'apply' | 'abort' | 'fail') => mixed): void,
  },
};
