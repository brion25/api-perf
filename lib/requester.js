/*jslint node: true */
'use strict';

var http = require('http');

function requester(options, concurrences,implementer,persistance) {

    var results = [];

    for (var i = 0; i < concurrences; i++) {

        var start = new Date().getTime(), firstByteReceived, firstB = true;

        var req = http.request(options, function(res) {
            res.on('data', function(chunk){
                if( chunk.length !== 0 && firstB === true ){
                    firstByteReceived = new Date().getTime() - start;
                    firstB = false;
                }

            }).on('end', function(){
                var total = new Date().getTime() - start;

                goNext(null,total,firstByteReceived,res.statusCode)

            }).on('error', function(error){
              goNext(error.message)
            })
        });
        req.end();
    }

    function goNext(err,downloaded,firstByteReceived,status){
      if(err){
        results.push({
          concurrence : persistance.getCurrentConcurrance(),
          data : {
            error : err
          }
        });
      }else{
        results.push({
          concurrence : persistance.getCurrentConcurrance(),
          data : {
            status : status,
            downloaded : downloaded,
            firstbyte : firstByteReceived
          }
        });
      }
      if(persistance.getCurrentConcurrance() == concurrences + 1 && persistance.getCurrentIteration() == persistance.getMaxIteration() + 1){
        implementer.writeReport();
      }

      if(persistance.getCurrentConcurrance() == concurrences){
        persistance.setCurrentResults(results);
        implementer.doNext();
      }

      persistance.incrementConcurrance();
    }
}

module.exports = requester;
