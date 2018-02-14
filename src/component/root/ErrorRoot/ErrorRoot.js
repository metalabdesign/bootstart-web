// @flow

// Import modules ==============================================================
import React from 'react';

const style = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  position: 'fixed',
  background: '#fff',
  padding: 10,
  fontFamily: 'monospace',
};

class ErrorRoot extends React.PureComponent<{error: Error}> {
  static rootElementId = 'error';

  render() {
    return (
      <pre style={style}>
        {this.props.error.stack || this.props.error.name}
      </pre>
    );
  }
}

export default ErrorRoot;
