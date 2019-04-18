const { paths } = require('./config');

const devServer = {
  contentBase: paths.build,
  port: 3003,
  host: '0.0.0.0',
  inline: true,
  compress: true,
  disableHostCheck: true,
};

module.exports = {
  devServer,
};
