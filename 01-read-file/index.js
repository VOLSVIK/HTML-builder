// node 01-read-file

const fs = require('fs');

fs.createReadStream( __dirname + '\\text.txt', 'utf8').on('data', function(txt){ 
  console.log(txt);
});