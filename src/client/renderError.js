/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import ErrorRoot from '/component/root/Error';

let appFailed = false;

const getErrorRootNode = () => {
  let root = document.getElementById(ErrorRoot.rootNodeId);

  if (root) {
    return root;
  }

  root = document.createElement('div');
  root.id = '__error';

  // Flow things.
  if (!document.body) {
    throw new Error();
  }

  document.body.appendChild(root);

  return root;
};

// TODO: Unmount the main app when this is called.
export const renderError = (error: Error) => {
  if (!appFailed) {
    ReactDOM.hydrate(<ErrorRoot error={error}/>, getErrorRootNode());
    appFailed = true;
  }
};

export default renderError;
