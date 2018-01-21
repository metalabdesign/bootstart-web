// @flow
// =============================================================================
// Import modules.
// =============================================================================
import React from 'react';
import {connect} from 'react-redux';
import {IntlProvider} from 'react-intl';

// =============================================================================
// Import selectors.
// =============================================================================
import {getLocale, getCurrentMessages} from '/selector/intl.selector';

export type Props = {
  locale: string,
  messages: {[string]: string},
};

export const Intl = ({locale, messages, ...props}: Props) => (
  <IntlProvider
    // By default, changes to the locale at runtime may not trigger a re-render
    // of child elements. Adding a `key` prop that changes with the locale
    // pursuades React to re-render the component tree.
    key={locale}
    locale={locale}
    messages={messages}
    // This is the local in which all of the `defaultMessage` values are written
    // in each component.
    defaultLocale='en'
    {...props}
  />
);

export default connect(
  (state): Props => ({
    locale: getLocale(state),
    messages: getCurrentMessages(state),
  }),
  null,
)(Intl);
