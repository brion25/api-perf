var events = require('events'),
    ProgressBar = require('progress'),
    colors = require('colors'),
    Requester = require('./requester'),
    Persistance = require('./persistanceData'),
    writer = require('./writeReport'),
    emitter = new events.EventEmitter();

function Implementer(config){
  var instance=null,
      urls = config.url,
      rname = config.rname;

  return {
    run : function(){
        var urlIterator = 0;

        emitter.on('nextUrl',function(){
            if(urlIterator < urls.length){
                config.url = urls[urlIterator];
                urlIterator++;
                config.rname = rname + ' - '+urlIterator;
                if(config.url.indexOf('//') < 0 ) config.url="http://"+config.url;
                if(config.url.substring(config.url.indexOf('//') + 2).indexOf('/') < 0) config.url = config.url + '/';

                instance = new Implements(config);
                instance.doFirst();
            }
        });

        emitter.emit('nextUrl');
    }
  };

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

    console.log('\n',config.method.inverse+' '+config.url.underline.grey,'\n');
    this.progress = new ProgressBar(' We are working ['+':bar'.grey+'] '+':percent'.grey+' :etas',{
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
      writer(persistance.getResults(), config.rname,instance);
    }

    this.nextUrl = function(){
        emitter.emit('nextUrl');
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
