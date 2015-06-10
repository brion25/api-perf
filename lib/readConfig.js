var path = require('path');

function readConfig (args){
  var pathResolved = path.resolve(path.normalize(args.config)),
      config = null;

  if(require.resolve(pathResolved)){
    config = require (pathResolved);
  }

  if(args.c) config.c = args.c;
  if(args.i) config.i = args.i;
  if(args.method) config.method = args.method

  return config;
}

module.exports = readConfig;
