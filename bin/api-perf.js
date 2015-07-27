var events = require('events'),
    args = require('minimist')(process.argv.slice(2)),
    Implementer = require('./../lib/implementer'),
    readConfig = require('./../lib/readConfig'),
    commands = require('./../lib/commands'),
    emitter = new events.EventEmitter();

function ApiPerf(){
  var now = new Date(),
      urlIterator = 0;

  var defaults = {
        method:'GET',
        c:10,
        i:10,
        rname : new Date().toISOString().split('T')[0].replace(/-/g,'')+' - report'
      },
      config = {};

  if(args.help){
    console.log(commands);
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

  var originalConfig = config;

  if(!config.url instanceof Array){
      originalConfig.url = [];
      originalConfig.url.push(config.url);
  }

  emitter.on('nextUrl',function(){
      config.url = originalConfig.url[urlIterator];
      urlIterator++;
      console.log(config.url);
      if(config.url.indexOf('//') < 0 ) config.url="http://"+config.url;
      if(config.url.substring(config.url.indexOf('//') + 2).indexOf('/') < 0) config.url = config.url + '/';

      var implementer = Implementer(config).getInstance();
      implementer.doFirst();
  });

  emitter.emit('nextUrl');
}

module.exports = ApiPerf;
