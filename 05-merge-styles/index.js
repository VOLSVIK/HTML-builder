// node 05-merge-styles

const fs = require('fs');
let path = require('path');
const wayDir = path.join(__dirname, 'styles');
let cssData = '';
fs.promises.readdir(wayDir)
  .then(filesDir => {
    for (let i = 0; i < filesDir.length; i++) {
      let wayDirFile = path.join(wayDir, filesDir[i]);
      fs.readFile(wayDirFile, 'utf8', function(error, data){
        if(error) throw error;
   
        if (path.parse(wayDirFile).ext === '.css' ) {
          cssData = cssData + data + '\n';  
        }
        let wayProjectBundle = path.join(path.join(__dirname, 'project-dist'), 'bundle.css');
        fs.writeFile(wayProjectBundle, cssData, function(error){
          if(error) throw error;
        });
      });
    }
  });
