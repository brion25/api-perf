var fs = require('fs');

module.exports = {
  doesFolderExist : function(path,mask,callback){
    if(typeof mask == 'function'){
      callback = mask;
      mask = 0777;
    }

    fs.mkdir(path,mask,function(err){
      if(err){
        if(err.code == 'EEXIST') callback(null);
        else callback(err);
      }else callback(null);
    });
  }
}
