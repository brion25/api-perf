/*jslint node: true */
'use strict';

var http = require('http');

function requester(options, concurrences,implementer,persistance) {

    var results = [];

    for (var i = 0; i < concurrences; i++) {

        var start = new Date().getTime();

        var req = http.request(options, function(res) {

            res.on('data', function(chunk){}).on('end', function(){

                var total = new Date().getTime() - start;
                results.push({
                  concurrence : persistance.getCurrentConcurrance(),
                  data : {
                    downloaded : total
                  }
                });

                if(persistance.getCurrentConcurrance() == concurrences && persistance.getCurrentIteration() == persistance.getMaxIteration()){
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
