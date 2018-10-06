const { paths } = require('./config');

const devServer = {
  contentBase: paths.build,
  port: 3333,
  host: '0.0.0.0',
  inline: true,
  compress: true,
};

module.exports = {
  devServer,
};
