// node 05-merge-styles

const fs = require('fs');
let path = require('path');

let cssData = '';
fs.promises.readdir(__dirname + '\\styles')
  .then(filesDir => {
    for (let i = 0; i < filesDir.length; i++) {
      fs.readFile(__dirname + '\\styles\\'+ filesDir[i], 'utf8', function(error, data){
        if(error) throw error;
   
        if (path.parse(__dirname + '\\styles\\'+ filesDir[i]).ext === '.css' ) {
          cssData = cssData + data + '\n';  
        }
    
        fs.writeFile(__dirname + '\\project-dist\\bundle.css', cssData, function(error){
          if(error) throw error;
        });
      });
    }
  });
