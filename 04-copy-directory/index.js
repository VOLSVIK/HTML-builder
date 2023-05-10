// node 04-copy-directory

const fs = require('fs');
var path = require('path');
const wayDir = path.join(__dirname, 'files');
fs.promises.mkdir(path.join(__dirname, 'files-copy'), { recursive: true });
const wayDirNew = path.join(__dirname, 'files-copy');
fs.promises.readdir(wayDirNew)
  .then(filesDir => {
    for (let fileDir of filesDir) {
      let wayDirNewFile = path.join(wayDirNew, fileDir);
      fs.unlink(wayDirNewFile, err => {
        if(err) throw err;
      });
    }

    fs.promises.readdir(wayDir)
      .then(filesDir => {
        filesDir.forEach(fileDir => {
          let wayDirFile = path.join(wayDir, fileDir);
          let wayDirNewFile = path.join(wayDirNew, fileDir);
          fs.promises.copyFile(wayDirFile, wayDirNewFile);
        });
      });
  });

