var jf = require('jsonfile');

function ReadFile(filePath){
  jf.readFileSync(filePath,function(err,obj){
    if(err){
      throw err;
    }
    return obj;
  });
}

module.exports = ReadFile;
