var env = 'development';

if (process.argv) {
   var prod = process.argv.filter((param) => param.includes('production'));
    if (prod.length > 0) {
      env = 'production';
    }
}

if (env === 'test' | env === 'development' | env === 'production') {
  var config = require('./config.json');
  var envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}
