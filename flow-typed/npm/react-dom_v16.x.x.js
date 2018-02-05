// flow-typed signature: f5e3086a9c2198d6e51070b75f838036
// flow-typed version: <<STUB>>/react-dom_v16/flow_v0.63.1

declare module 'react-dom' {
  // https://github.com/facebook/flow/issues/5035
  declare function hydrate<ElementType: React$ElementType>(
    element: React$Element<ElementType>,
    container: Element,
    callback?: () => void,
  ): React$ElementRef<ElementType>;
}
