var Requester = require('./../lib/requester');

function Implementer(config){
  var iterations = config.i,
      options = {};

  if(config.proxy){
    var proxyFormatted = formatProxy(config.proxy);
    options:{
      host : proxyFormatted.proxy,
      port : proxyFormatted.port,
      headers : {
        Host : getHost(config.url)
      }
    }
  }

  options = {
    path : config.url,
    method:config.method
  }

  for(var i = 0;i<iterations;i++){
    new Requester(options,config.c);
  }

  function getHost(url){
    var start = url.indexOf('//') + 2;
    var end = url.substring(start).indexOf('/');
    return url.substring(start,end+start);
  }

  function formatProxy(proxyUrl){
    var array = proxyUrl.split(':');
    return {
      port : array[array.length - 1],
      proxy : array[0]
    };
  }
}

module.exports = Implementer;
