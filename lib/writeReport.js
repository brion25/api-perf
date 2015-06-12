var Table = require('cli-table'),
    fs = require('fs'),
    ejs = require('ejs'),
    path = require('path'),
    join = require('path').join,
    templatePath = join(__dirname,'/../templates/basic-report.ejs');

function WriteReport(obj,rname){
  rname = '/'+rname+'.html';
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

  console.log('Timing Info','\n');
  var table = new Table({
    head : ['TH Slowest Request','TH Fastest Request','TH Avarage Time']
  });

  table.push([obj.maxTimeRequest+' ms',obj.minTimeRequest+' ms',obj.avgTimeRequest+' ms']);

  console.log(table.toString());

    var repDir = path.normalize(process.cwd() + '\\aperf-report');

    var rmdir = function(dir) {
        var list = fs.readdirSync(dir);
        for(var i = 0; i < list.length; i++) {
            var filename = path.join(dir, list[i]);
            var stat = fs.statSync(filename);

            if(filename == "." || filename == "..") {
                // pass these files
            } else if(stat.isDirectory()) {
                // rmdir recursively
                rmdir(filename);
            } else {
                // rm fiilename
                fs.unlinkSync(filename);
            }
        }
        fs.rmdirSync(dir);
    };

    if(!fs.existsSync(repDir)){
        fs.mkdirSync(repDir);
        var html = ejs.render(fs.readFileSync(templatePath,'utf8'), obj, {filename:templatePath});
        fs.writeFileSync(repDir.concat(rname),html);
    }else{
        rmdir(repDir);
        try{
            fs.mkdirSync(repDir);
            var html = ejs.render(fs.readFileSync(templatePath,'utf8'), obj, {filename:templatePath});
            fs.writeFileSync(repDir.concat(rname),html);
        }catch(e){

            console.log('\nImpossible write the report, you must be outside of report folder : )');

        }
    }

}

module.exports = WriteReport;
