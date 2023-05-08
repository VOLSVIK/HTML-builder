// node 04-copy-directory

const fs = require('fs');

fs.promises.mkdir(__dirname + '\\files-copy', { recursive: true });
fs.promises.readdir(__dirname + '\\files-copy\\')
  .then(filesDir => {
    for (let fileDir of filesDir) {
      fs.unlink(__dirname + '\\files-copy\\' + fileDir, err => {
        if(err) throw err;
      });
    }

    fs.promises.readdir(__dirname + '\\files\\')
      .then(filesDir => {
        filesDir.forEach(fileDir => {
          fs.promises.copyFile(__dirname + '\\files\\' + fileDir, __dirname + '\\files-copy\\' + fileDir);
        });
      });
  });

