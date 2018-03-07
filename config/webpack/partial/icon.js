import {loader} from 'webpack-partial';

const removeFill = {
  type: 'perItem',
  match: /^#(000){1,2}$/,
  fn(item) {
    if (item.elem) {
      let hasFill = false;

      item.eachAttr((attr) => {
        const {name, value} = attr;
        let fill;

        if ((fill = name === 'fill') || name === 'stroke') {
          hasFill = hasFill || fill;

          if (value.match(this.match)) {
            item.removeAttr(name, value);
          }
        }
      });
    }
  },
};

export default () =>
  loader({
    test: /\.component.svg$/,
    loaders: [
      {
        loader: require.resolve('babel-loader'),
        query: {
          plugins: [require.resolve('babel-plugin-transform-react-jsx')],
        },
      },
      {
        loader: require.resolve('svg-react-loader'),
      },
      {
        loader: require.resolve('svgo-loader'),
        options: {
          plugins: [
            {removeStyleElement: true},
            {removeTitle: true},
            {removeFill},
          ],
        },
      },
    ],
  });
