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
    console.log(commands);
    process.exit(0);
  }

  if(!args.url){
    config = readConfig(args);
  }else{
    if(args.url) config.url = unescape(args.url);
  }

  if(args.c) config.c = args.c;
  else if(!config.c) config.c = defaults.c;
  if(args.i) config.i = args.i;
  else if(!config.i) config.i = defaults.i;
  if(args.method) config.method = args.method
  else if(!config.method) config.method = defaults.method
  if(args.rname) config.rname = args.rname
  else if(!config.rname) config.rname = defaults.rname

  if(args.proxy) config.proxy = args.proxy;

  if(!(config.url instanceof Array)){
      var temp = config.url;
      config.url = [];
      config.url.push(temp);
  }

  var implementer = Implementer(config).run();
}

module.exports = ApiPerf;
