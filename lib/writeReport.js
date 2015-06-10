var fs = require('fs'),
    ejs = require('ejs'),
    path = require('path'),
    join = require('path').join,
    templatePath = join(__dirname,'/../templates/basic-report.ejs');

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
    
    var repDir = path.dirname(require.main.filename) + '\\aperf-report';
    
    if(!fs.existsSync(repDir)){
		fs.mkdirSync(repDir);
 	}

  var html = ejs.render(fs.readFileSync(templatePath,'utf8'), obj, {filename:templatePath});

  fs.writeFileSync('./aperf-report/basic-report.html',html);

  console.log('Done!');
}

module.exports = WriteReport;
