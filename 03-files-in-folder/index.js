// node 03-files-in-folder

const fs = require('fs');
var path = require('path');

const fileOrFolder = async (dir) => {
  let filehandle, stats = null;
  try {
    filehandle = await fs.promises.open(dir);
    stats = await filehandle.stat();
  } finally {
    if (filehandle) {
      await filehandle.close();
    }
  }
  if (stats.isFile()) {
    console.log(`${path.parse(dir).name}-${path.parse(dir).ext.slice(1)}-${stats.size} bytes`);
  }
};

fs.promises.readdir(__dirname + '\\secret-folder\\')
  .then(filesDir => {
    for (let fileDir of filesDir) {
      fileOrFolder(__dirname + '\\secret-folder\\'+ fileDir);
    }
  });