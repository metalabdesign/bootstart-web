// =============================================================================
// Import lodash.
// =============================================================================
import compose from "lodash/fp/compose";

// =============================================================================
// Import modules.
// =============================================================================
import React from "react";

// =============================================================================
// Import components.
// =============================================================================
import createRelocationComponent, {
  FLYOUT_TARGET,
} from "/component/relocation";
import Flyout from "/component/base/flyout";
import {register} from "/component";
import Info from "./info";

export const COMPONENT_ID = "@@debug/INFO";

export default compose(
  register(COMPONENT_ID),
  createRelocationComponent,
)({
  [FLYOUT_TARGET]: ({flyoutProps, remove}) => (
    <Flyout
      {...flyoutProps}
      onClickOutside={remove}
    >
      <Info/>
    </Flyout>
  ),
});
