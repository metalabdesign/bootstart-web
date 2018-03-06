// @flow
import React from 'react';

import Status from '/component/util/Status';

const NotFoundView = () => (
  <div>
    <Status code={404}/>
    Not found.
  </div>
);

export default NotFoundView;
