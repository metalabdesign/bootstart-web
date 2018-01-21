export default [{
  // ===========================================================================
  // Browser element reset.
  // ===========================================================================

  [[
    'a',
    'abbr',
    'acronym',
    'address',
    'applet',
    'article',
    'aside',
    'audio',
    'b',
    'big',
    'blockquote',
    'body',
    'canvas',
    'caption',
    'center',
    'cite',
    'code',
    'dd',
    'del',
    'details',
    'dfn',
    'div',
    'dl',
    'dt',
    'em',
    'embed',
    'fieldset',
    'figcaption',
    'figure',
    'footer',
    'form',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'header',
    'hgroup',
    'html',
    'i',
    'iframe',
    'img',
    'ins',
    'kbd',
    'label',
    'legend',
    'li',
    'mark',
    'menu',
    'nav',
    'object',
    'ol',
    'output',
    'p',
    'pre',
    'q',
    'ruby',
    's',
    'samp',
    'section',
    'small',
    'span',
    'strike',
    'strong',
    'sub',
    'summary',
    'sup',
    'table',
    'tbody',
    'td',
    'tfoot',
    'th',
    'thead',
    'time',
    'tr',
    'tt',
    'u',
    'ul',
    'var',
    'video',
  ].join(',')]: {
    margin: 0,
    padding: 0,
    border: 0,
    font: 'inherit',
    verticalAlign: 'baseline',
  },

  // Style "unknown" block tags in ie11.
  [[
    'article',
    'aside',
    'canvas',
    'figcaption',
    'figure',
    'footer',
    'header',
    'hgroup',
    'main',
    'output',
    'section',
  ].join(',')]: {
    display: 'block',
  },

  body: {
    lineHeight: 1,
  },

  'ol, ul': {
    listStyle: 'none',
  },

  'blockquote, q': {
    quotes: 'none',
    '&::before, &::after': {
      content: '""',
      display: 'none',
    },
  },

  table: {
    borderCollapse: 'collapse',
    borderSpacing: 0,
  },

  'input, textarea, button, select': {
    appearance: 'none',
    background: 'none',
    borderColor: 'currentColor',
    borderStyle: 'none',
    borderWidth: 'medium',
    borderRadius: 0,
    margin: 0,
    padding: 0,
    color: 'inherit',
    fontStyle: 'inherit',
    fontVariant: 'inherit',
    fontWeight: 'inherit',
    fontStretch: 'inherit',
    fontSize: 'inherit',
    fontFamily: 'inherit',
    lineHeight: 'inherit',
    verticalAlign: 'baseline',
  },

  '::placeholder': {
    opacity: 1,
    color: 'inherit',
    fontStyle: 'inherit',
    fontVariant: 'inherit',
    fontWeight: 'inherit',
    fontStretch: 'inherit',
    fontSize: 'inherit',
    fontFamily: 'inherit',
  },

  // Reset anchor elements.
  'a:link': {
    textDecoration: 'none',
  },
  'a:link, a:visited, a:hover, a:active': {
    color: 'inherit',
  },

  // Remove input overlay elements.
  '::-webkit-inner-spin-button': {
    appearance: 'none',
  },
  '::-webkit-outer-spin-button': {
    appearance: 'none',
  },
  '::-webkit-search-cancel-button': {
    appearance: 'none',
  },
  '::-webkit-search-results-button': {
    appearance: 'none',
  },
  '::-ms-clear, ::-ms-reveal': {
    display: 'none',
  },
  '::-webkit-contacts-auto-fill-button': {
    display: 'none !important',
  },

  // Remove firefox number input arrow buttons.
  input: {
    '-moz-appearance': 'textfield',
  },
}, {
  // Disable focus styles on elements focused by mouse and touch events.
  '[data-whatinput="mouse"] :focus, [data-whatinput="touch"] :focus': {
    outline: 'none',
  },
}, {
  // Ensure content spans at least the size of the browser window.
  // See: http://codepen.io/absolutholz/post/html-and-body-element-height-100
  html: {
    height: '100%',
  },
  body: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  ':global body > div.root': {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    flexBasis: 'auto',
  },
}, {
  // Consistent `box-sizing`.
  // See: http://www.paulirish.com/2012/box-sizing-border-box-ftw/
  html: {
    boxSizing: 'border-box',
  },
  '*, *:before, *:after': {
    boxSizing: 'inherit',
  },
}, {
  // Global body styles
  body: {

  },
}];
