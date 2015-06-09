var fs = require('fs'),
    ejs = require('ejs'),
    join = require('path').join,
    path = join(__dirname,'/../templates/basic-report.ejs');

function WriteReport(obj){
  if(!fs.existsSync('./api-perf-report/')){
    fs.mkdirSync(path);
  }

  var html = ejs.render(fs.readFileSync(path,'utf8'), obj, {filename:path});

  fs.writeFileSync('./api-perf-report/basic-report.html',html);

  console.log('Done!');
}

module.exports = WriteReport;
