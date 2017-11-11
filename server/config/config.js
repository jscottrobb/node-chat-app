var fs = require('fs');
var path = require('path');

var env = 'development';
var jsonPath = path.join(__dirname, 'config.json');

if(!fs.existsSync(jsonPath, 'utf-8')) {
    env = 'production';
    process.env.LOG_BASE = './logs';
    process.env.LOG_LEVEL = 'off';
}

if (env === 'test' | env === 'development') {
  var config = require('./config.json');
  var envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}
