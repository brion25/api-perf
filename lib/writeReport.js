var fs = require('fs'),
    Table = require('cli-table'),
    ejs = require('ejs'),
    path = require('path'),
    colors = require('colors'),
    join = require('path').join,
    templatePath = join(__dirname,'/../templates/basic-report.ejs'),
    doesFolderExist = require('./helpers').doesFolderExist;

function WriteReport(obj,rname){
  rname = '/'+rname+'.html';
  var iterationsTimeTaken = [],
      statusTaken = [];
  obj.iterations.forEach(function(iteration){
    var concurrenceTimeTaken = iteration.results.map(function(concurrence){
      statusTaken.push(concurrence.data.status);
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

  console.log(' Timing Info','\n');
  var table = new Table({
    head : ['Slowest Request','Fastest Request','Avarage Time','Status Code']
  });

  var everythingOk = statusTaken.every(function(stat){
    return stat < 300;
  })

  var max = (obj.maxTimeRequest>=1000)?round2Num(obj.maxTimeRequest/1000)+'s':obj.maxTimeRequest+' ms',
      min = (obj.minTimeRequest>=1000)?round2Num(obj.minTimeRequest/1000)+'s':obj.minTimeRequest+' ms',
      avg = (obj.avgTimeRequest>=1000)?round2Num(obj.avgTimeRequest/1000)+'s':obj.avgTimeRequest+' ms';

  table.push([max,min,avg,(everythingOk)?'Ok'.green:'Not Ok'.red]);

  console.log(table.toString());

  console.log('\n','Ok'.green,'- All the request were successfull, status code of 200')
  console.log('','Not Ok'.red,'- 1 or more requests were not successful, status code different than 200')

    var repDir = path.normalize(process.cwd() + '//aperf-report');

    doesFolderExist(repDir,function(err){
      if(err){
        console.log(err);
        process.exit(1);
      }

      var html = ejs.render(fs.readFileSync(templatePath,'utf8'), obj, {filename:templatePath});
      fs.writeFile(path.normalize(repDir.concat(rname)),html,function(err){
        if(err){
          console.log(err);
          process.exit(1);
        }

        console.log('\n You can see a full report following the path: '+path.normalize(repDir.concat(rname).underline.grey) + '\n\n');
      });

    });

    function round2Num(num){
      return Math.round(num*100)/100;
    }
}

module.exports = WriteReport;
