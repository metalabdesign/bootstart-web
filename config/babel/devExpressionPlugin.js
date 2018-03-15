/* eslint-disable */
module.exports = function(babel) {
  const t = babel.types;

  const DEV_EXPRESSION = t.binaryExpression(
    '!==',
    t.memberExpression(
      t.memberExpression(t.identifier('process'), t.identifier('env'), false),
      t.identifier('NODE_ENV'),
      false
    ),
    t.stringLiteral('production')
  );

  return {
    visitor: {
      Identifier: {
        enter: function(path) {
          // Do nothing when testing
          if (process.env.NODE_ENV === 'test') {
            return;
          }
          // replace __DEV__ with process.env.NODE_ENV !== 'production'
          if (path.isIdentifier({name: '__DEV__'})) {
            path.replaceWith(DEV_EXPRESSION);
          }
        },
      },
    },
  };
};
