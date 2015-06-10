function Persistance(){
  var iteration = 1,
      maxIteration = null,
      concurrence = 1,
      helperResults = null,
      results = {
        iterations : []
      };

  this.getMaxIteration = function(){
    return maxIteration;
  }

  this.setMaxIteration = function(max){
    maxIteration = max;
  }

  this.getCurrentIteration = function(){
    return iteration;
  }

  this.incrementInteration = function(){
    iteration++;
  }

  this.getCurrentConcurrance = function(){
    return concurrence;
  }

  this.incrementConcurrance = function(){
    concurrence++;
  }

  this.refreshConcurrance = function(){
    concurrence = 1;
  }

  this.setCurrentResults = function(results){
    helperResults = results;
  }

  this.saveResults = function(){
    var report = {
      iteration :iteration - 1,
      date : new Date().toISOString(),
      results : helperResults
    }
    results.iterations.push(report);
  }

  this.getResults = function(){
    return results;
  }

  this.setGeneralInfo = function(config){
    results.url = config.url;
    results.i = config.i;
    results.c = config.c;
    results.method = config.method;
  }
}

module.exports = Persistance;
