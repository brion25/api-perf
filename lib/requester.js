/*jslint node: true */
'use strict';

var http = require('http');

function requester(options, concurrences,implementer,persistance) {

    var results = [];
    console.log(options);

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
                results.push({
                  concurrence : persistance.getCurrentConcurrance(),
                  data : {
                    status : res.statusCode,
                    downloaded : total,
                    firstbyte : firstByteReceived
                  }
                });

                if(persistance.getCurrentConcurrance() == concurrences + 1 && persistance.getCurrentIteration() == persistance.getMaxIteration() + 1){
                  implementer.writeReport();
                }

                if(persistance.getCurrentConcurrance() == concurrences){
                  persistance.setCurrentResults(results);
                  implementer.doNext();
                }

                persistance.incrementConcurrance();

            }).on('error', function(error){

                console.log(error);

            })
        });
        req.end();
    }
}

module.exports = requester;
