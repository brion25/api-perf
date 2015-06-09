var args = require('yargs').argv,
    Implementer = require('./implementer'),
    readConfig = require('./../lib/readConfig');

function ApiPerf(){

  var defaults = {
        method:'GET',
        c:10,
        i:10
      },
      config = {};
  if(!args.url){
    config = readConfig(args);
  }else{
    if(args.url) config.url = args.url;
    if(args.c) config.c = args.c;
    else config.c = defaults.c;
    if(args.i) config.r = args.i;
    else config.i = defaults.i;
    if(args.method) config.method = args.method
    else config.method = defaults.method
  }
    if(args.proxy) config.proxy = args.proxy;

  var implementer = Implementer(config).getInstance();
  implementer.doFirst();
}

module.exports = ApiPerf;
