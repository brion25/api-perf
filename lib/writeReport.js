var fs = require('fs'),
    ejs = require('ejs'),
    join = require('path').join,
    path = join(__dirname,'/../templates/basic-report.ejs');

function WriteReport(obj){
  if(!fs.existsSync('./api-perf-report/')){
    fs.mkdirSync(path);
  }

  var data = {
    iterations : obj
  };

  var html = ejs.render(fs.readFileSync(path,'utf8'), data, {filename:path});

  console.log(html);
}

module.exports = WriteReport;
