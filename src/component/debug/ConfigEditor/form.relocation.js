import compose from "lodash/fp/compose";
import React from "react";

import createRelocationComponent, {
  MODAL_ROOT,
} from "/component/relocation";
import Modal from "/component/base/modal";
import PaddedContent from "/component/base/padded-content";
import {register} from "/component";

import Form from "./form";

export const COMPONENT_ID = "@@debug/FEATURE_MODAL";

export default compose(
  register(COMPONENT_ID),
  createRelocationComponent,
)({
  [MODAL_ROOT]: ({modalProps, remove}) => {
    return (
      <Modal
        {...modalProps}
        title="Features"
        size="large"
        onClickClose={remove}
        onClickOutside={remove}
      >
        <PaddedContent>
          <Form onCancel={remove} onSuccess={remove}/>
        </PaddedContent>
      </Modal>
    );
  },
});
