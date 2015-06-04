var request = require('request'),
    readConfig = require('./../lib/readConfig');

function ApiPerf(){
  var config = readConfig();

  console.log(config.url);
  var req = request[config.method.toLowerCase()](config.url);

  req.on('error',function(err){
    console.log(err);
    process.exit(1);
  })

  req.on('response',function(response){
    console.log(response);
  })
}

module.exports = ApiPerf;
