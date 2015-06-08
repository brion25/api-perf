var Requester = require('./../lib/requester');

function Implementer(config){
  var iterations = config.i;
  for(var i = 0;i<iterations;i++){
    new Requester(config);
  }
}

module.exports = Implementer;
