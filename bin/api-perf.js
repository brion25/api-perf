var args = require('minimist')(process.argv.slice(2)),
    Implementer = require('./implementer'),
    readConfig = require('./../lib/readConfig');

function ApiPerf(){
  console.log('working...');
  var defaults = {
        method:'GET',
        c:10,
        i:10
      },
      config = {};
  if(!args.url){
    config = readConfig(args);
  }else{
    if(args.url) config.url = args.url.replace(/%28/g,'(').replace(/%29/g,')');
    if(args.c) config.c = args.c;
    else config.c = defaults.c;
    if(args.i) config.i = args.i;
    else config.i = defaults.i;
    if(args.method) config.method = args.method
    else config.method = defaults.method
  }
  if(args.proxy) config.proxy = args.proxy;

  if(config.url.indexOf('//') < 0 ) config.url="http://"+config.url;
  if(config.url.substring(config.url.indexOf('//') + 2).indexOf('/') < 0) config.url = config.url + '/';

  var implementer = Implementer(config).getInstance();
  implementer.doFirst();
}

module.exports = ApiPerf;
