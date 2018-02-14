// @flow

// Import modules ==============================================================
import capture from 'bugnet';
import ErrorStackParser from 'error-stack-parser';

import renderError from '/client/renderError';

let a;

const absolute = (path: string) => {
  // Use the magic of the DOM to convert `/asset` to `http://host/asset`
  a = a || document.createElement(a);
  a.href = path;
  return window.location.origin + a.href;
};

capture((error: mixed) => {
  if (error instanceof Error) {
    let frames;

    try {
      frames = ErrorStackParser.parse(error);
    } catch (e) {
      frames = [];
    }

    // Detect that the caught error originated from our own code. If the source
    // file name parsed from the error stack is not under the asset public path,
    // consider the error as originating from a vendor script.
    if (
      frames[0] !== undefined &&
      typeof frames[0].fileName === 'string' &&
      frames[0].fileName.indexOf(absolute(__webpack_public_path__)) !== 0
    ) {
      // Ignore vendor script error.
    } else {
      renderError(error);
    }
  }
});
