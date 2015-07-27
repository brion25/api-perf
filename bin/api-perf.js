var args = require('minimist')(process.argv.slice(2)),
    Implementer = require('./../lib/implementer'),
    readConfig = require('./../lib/readConfig'),
    commands = require('./../lib/commands');

function ApiPerf(){
  var now = new Date();

  var defaults = {
        method:'GET',
        c:10,
        i:10,
        rname : new Date().toISOString().split('T')[0].replace(/-/g,'')+' - report'
      },
      config = {};

  if(args.help){
      for(var cmd in commands.help){
        console.log( '\n  ' + cmd + ' ' + commands.help[cmd] + '');
      }
    process.exit(0);
  }

  if(!args.url){
    config = readConfig(args);
  }else{
    if(args.url) config.url = unescape(args.url);
    if(args.c) config.c = args.c;
    else config.c = defaults.c;
    if(args.i) config.i = args.i;
    else config.i = defaults.i;
    if(args.method) config.method = args.method
    else config.method = defaults.method
    if(args.rname) config.rname = args.rname
    else config.rname = defaults.rname
  }

  if(args.proxy) config.proxy = args.proxy;

  if(config.url.indexOf('//') < 0 ) config.url="http://"+config.url;
  if(config.url.substring(config.url.indexOf('//') + 2).indexOf('/') < 0) config.url = config.url + '/';

  var implementer = Implementer(config).getInstance();
  implementer.doFirst();
}

module.exports = ApiPerf;
