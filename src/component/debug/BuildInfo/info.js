// =============================================================================
// Import modules.
// =============================================================================
import React from 'react';
import {connect} from 'react-redux';
import {setComponent} from 'relocation';
import {FormattedDate} from 'react-intl';

// =============================================================================
// Import components.
// =============================================================================
import Button from '/component/base/button';
import {COMPONENT_ID as FEATURE_EDITOR} from '../feature';
import ReduxDevToolsToggle from '../redux-dev-tools-toggle';

// =============================================================================
// Import styles.
// =============================================================================
import {LIST, CONTAINER} from './info.css';

// TODO: Add link to specific commit if on VPN:
// https://gecgithub01.walmart.com/R-Transaction/ow-checkout/commit/xxx
// const checkStatus = (url) => new Promise((resolve, reject) => {
//   const img = new Image();
//   img.src = url;
//   img.onload = resolve;
//   img.onerror = reject;
// });

const BuildInfo = ({
  setComponent,
  sourceVersion = process.env.SOURCE_VERSION,
  buildDate = process.env.BUILD_DATE,
}) => (
  <div className={CONTAINER}>
    <ul className={LIST}>
      <li>Commit: {sourceVersion}</li>
      <li>Build date: <FormattedDate value={buildDate}/></li>
    </ul>
    <Button
      onClick={() => setComponent(FEATURE_EDITOR, '@@debug/FEATURES')}
      fakelink
    >
      Edit Features
    </Button>
  </div>
);

export default connect(
  null,
  {setComponent},
)(BuildInfo);
