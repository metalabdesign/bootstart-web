# State Selectors

Values within the redux state atom are accessed using selector functions.

Any selector function must follow the strict pattern of `(state) => result`, it should take the _entire_ state as the first argument - it should not operate on only a branch of the state tree.

When complex values need to be computed from the state, the logic are defined as memoized selectors. Selectors that need "arguments" are defined as higher-order memoized selector-creators which return memoized selectors for a specific argument set.

Following strict memoization patterns ensures that rapid state updates do not result in numerous unnecessary updates in the component tree. It is paramount to ensure stable UI performance as an app grows in complexity.

It will be tempting to add logic to the `mapState` function of connect calls but anything beyond trivial object value lookup should be defined as a reusable selector. 
