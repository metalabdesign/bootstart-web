// =============================================================================
// Import modules.
// =============================================================================
import React from 'react';

// =============================================================================
// Import components.
// =============================================================================
import Icon from '/component/base/icon';
import Button from '/component/base/button';
import FlyoutTarget from '/component/relocation/flyout-target';
import {COMPONENT_ID as DEBUG_INFO} from './info';

const DebugFooter = () => (
  <FlyoutTarget automationId='debug-flyout'>
    {({show}) => (
      <Button
        automationId='debug-toggle-flyout'
        fakelink
        onClick={() => show(DEBUG_INFO)}
      >
        <Icon name='info-circle'/>{' '}
        {process.env.SOURCE_VERSION.substr(0, 6)}
      </Button>
    )}
  </FlyoutTarget>
);

export default DebugFooter;
