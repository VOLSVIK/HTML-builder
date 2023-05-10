// node 01-read-file

const fs = require('fs');
const path = require('path');
fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf8').on('data', function(txt){ 
  console.log(txt);
});