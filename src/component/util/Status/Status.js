// @flow

/* flowlint
 *   unclear-type: off
 */

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
          (context.staticContext: any).status = code;
        }
        return null;
      }}
    />
  );
};

export default Status;
