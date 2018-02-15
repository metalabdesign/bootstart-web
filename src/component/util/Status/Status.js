// @flow

// Import modules ==============================================================
import React from 'react';
import {Route} from 'react-router-dom';

export type Props = {
  code: number
};

export const Status = ({code}: Props) => {
  return (
    <Route
      render={(context) => {
        if (context.staticContext) {
          // flowlint unclear-type: off
          (context.staticContext: any).status = code;
          // flowlint unclear-type: error
        }
        return null;
      }}
    />
  );
};

export default Status;
