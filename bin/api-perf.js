var request = require('request'),
    readConfig = require('./../lib/readConfig');

function ApiPerf(){
  var config = readConfig();

  console.log(config.url);
}

module.exports = ApiPerf;
