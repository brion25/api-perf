var fs = require('fs');

function WriteFile(obj,filePath){
  fs.writeFile(filePath,JSON.stringify(obj),function(err){
    if(err) console.log(err);
    console.log("Done!");
  });
}

module.exports = WriteFile;
