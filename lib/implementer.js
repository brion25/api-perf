var ProgressBar = require('progress'),
    Requester = require('./requester'),
    Persistance = require('./persistanceData'),
    writer = require('./writeReport');

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
        },
        path:config.url
      }
    }else{
      var host = getHost(config.url),
          path = getPath(config.url);

      options = {
        host : host,
        path : path
      }
    }

    options.method = config.method;

    console.log('\n',config.method+' '+config.url,'\n');
    this.progress = new ProgressBar('We are working [:bar] :percent :etas',{
      complete:'=',
      incomplete:' ',
      width:50,
      total: config.i
    });

    this.doFirst = function(){
      this.progress.tick();
      persistance = new Persistance();
      persistance.setMaxIteration(config.i);
      persistance.setGeneralInfo(config);
      new Requester(options,config.c,instance,persistance);
    }

    this.doNext = function(){
      var currentIteration = persistance.getCurrentIteration();
      if(currentIteration<=config.i){
        this.progress.tick();
        persistance.incrementInteration();
        persistance.refreshConcurrance();
        persistance.saveResults();
        new Requester(options,config.c,instance,persistance);
      }
    }

    this.writeReport = function(){
      //console.log(persistance.getResults());
      writer(persistance.getResults());
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

    function getPath(url){
      var host = url.substring(url.indexOf('//')+2);
      return host.substring(host.indexOf('/'));
    }
  }

}

module.exports = Implementer;
