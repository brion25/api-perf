var path = require('path');

function readConfig (){
  var pathResolved = path.resolve(path.normalize(process.argv[2])),
      file = null;

  if(require.resolve(pathResolved)){
    file = require (pathResolved);
  }
  return file;
}

module.exports = readConfig;
