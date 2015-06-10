var fs = require('fs'),
    ejs = require('ejs'),
    join = require('path').join,
    path = join(__dirname,'/../templates/basic-report.ejs');

function WriteReport(obj){
  var iterationsTimeTaken = [];
  obj.iterations.forEach(function(iteration){
    var concurrenceTimeTaken = iteration.results.map(function(concurrence){
      iterationsTimeTaken.push(concurrence.data.downloaded);
      return concurrence.data.downloaded;
    });

    iteration.maxTimeRequest = Math.max.apply(this,concurrenceTimeTaken);
    iteration.minTimeRequest = Math.min.apply(this,concurrenceTimeTaken);
    iteration.avgTimeRequest = Math.round((concurrenceTimeTaken.reduce(function(val1, val2){ return val1 + val2 },0) / concurrenceTimeTaken.length) * 100)/100;
  });
  obj.maxTimeRequest = Math.max.apply(this,iterationsTimeTaken);
  obj.minTimeRequest = Math.min.apply(this,iterationsTimeTaken);
  obj.avgTimeRequest = Math.round((iterationsTimeTaken.reduce(function(val1, val2){ return val1 + val2 },0) / iterationsTimeTaken.length) * 100)/100;

  var html = ejs.render(fs.readFileSync(path,'utf8'), obj, {filename:path});

  fs.writeFileSync('./basic-report.html',html);

  console.log('Done!');
}

module.exports = WriteReport;
