var Requester = require('./../lib/requester'),
    Persistance = require('./../lib/persistanceData'),
    writer = require('./../lib/writeFile');

function Implementer(config){

  var instance=null;

  return {
    getInstance:function(){
      if(!instance){
        instance = new Implements(config);
      }
      return instance;
    }
  }

  function Implements (config){
    var iterations = config.i,
        options = {},
        persistance = null;

    if(config.proxy){
      var proxyFormatted = formatProxy(config.proxy);
      options = {
        host : proxyFormatted.proxy,
        port : proxyFormatted.port,
        headers : {
          Host : getHost(config.url)
        }
      }
    }

    options.path = config.url;
    options.method = config.method;

    this.doFirst = function(){
      persistance = new Persistance();
      persistance.setMaxIteration(config.i);
      new Requester(options,config.c,instance,persistance);
    }

    this.doNext = function(){
      var currentIteration = persistance.getCurrentIteration();
      if(currentIteration<=config.i){
        persistance.incrementInteration();
        persistance.refreshConcurrance();
        persistance.saveResults();
        new Requester(options,config.c,instance,persistance);
      }
    }

    this.writeReport = function(){
      writer(persistance.getResults(),'./test.json');
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

}

module.exports = Implementer;
