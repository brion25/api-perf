/*jslint node: true */
'use strict';

var progressBar = require('progress');
var http = require('http');

function requester(options, concurrences) {
    
    console.log(options);
    
    for (var i = 0; i < concurrences; i++) {

        var req = http.request(options, function(res) {
            
                var len = parseInt(res.headers['content-length'], 10);
                
                var bar = new progressBar('  downloading [:bar] :percent :etas', {
                            complete: '=',
                            incomplete: ' ',
                            width: 20,
                            total: len
                          });
            
                var start = new Date().getTime();
            
            res.on('data', function(chunk){
                
                bar.tick(chunk.length);
                
            }).on('end', function(){
                
                var total = new Date().getTime() - start;
                console.log('\n',total);
                
            }).on('error', function(error){
                
                console.log(error);
                
            })            
        });
        req.end();
        
    }
}

module.exports = requester;