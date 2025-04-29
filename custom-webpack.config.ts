import * as webpack from 'webpack';
import * as dotenv from 'dotenv';
import * as path from 'path';

module.exports = (config: webpack.Configuration) => {
  dotenv.config({
    path: path.join(__dirname, '.env'),
  });

  config.plugins = config.plugins || [];
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    })
  );
  return config;
};
