// =============================================================================
// Import modules.
// =============================================================================
import React from 'react';
import {FormattedDate} from 'react-intl';

// =============================================================================
// Import styles.
// =============================================================================
import {LIST, CONTAINER} from './info.css';

const BuildInfo = ({
  sourceVersion = process.env.SOURCE_VERSION,
  buildDate = process.env.BUILD_DATE,
}) => (
  <div className={CONTAINER}>
    <ul className={LIST}>
      <li>Commit: {sourceVersion}</li>
      <li>Build date: <FormattedDate value={buildDate}/></li>
    </ul>
  </div>
);

export default BuildInfo;
