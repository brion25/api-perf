var jf = require('jsonfile');

function WriteFile(obj,filePath){
  jf.spaces = 4;
  jf.writeFileSync(obj,filePath,function(err){
    if(err){
      throw err;
    }
    return true;
  });
}

module.exports = WriteFile;
