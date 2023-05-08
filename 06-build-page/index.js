// node 06-build-page

const fs = require('fs');
const fsp = require('fs').promises;

let path = require('path');
let dadaCss = '';
fs.mkdir(__dirname + '\\project-dist', function() {
  fsp.readdir(__dirname + '\\styles')
    .then(fileIns => {
      for (let i = 0; i < fileIns.length; i++) {
        fs.readFile(__dirname + '\\styles\\'+ fileIns[i], 'utf8', function(error, data){
          if(error) throw error;
    
          if (path.parse(__dirname + '\\styles\\'+ fileIns[i]).ext === '.css' ) {
            dadaCss = dadaCss + data + '\n';  
          }
    
          fs.writeFile(__dirname + '\\project-dist\\styles.css', dadaCss, function(error){
            if(error) throw error;
          });
        });
      }
    });
});
let dadaHtml = '';
let nameHtml = '';
fsp.readFile(__dirname + '\\template.html', 'utf8')
  .then(data => {
    dadaHtml = data;
    fsp.readdir(__dirname + '\\components')
      .then(fileIns => {
        for (let i = 0; i < fileIns.length; i++) {
          if (path.parse(__dirname + '\\components\\'+ fileIns[i]).ext === '.html' ) {
            fsp.readFile(__dirname + '\\components\\'+ fileIns[i], 'utf8')
              .then(dataHtmlComponent => {
                nameHtml = path.parse(__dirname + '\\components\\'+ fileIns[i]).name; 
                let position = dadaHtml.indexOf('{{' + nameHtml + '}}');
                let str1 = dadaHtml.slice(0, position - 2);
                let str2 = dadaHtml.slice(position + nameHtml.length + 4);
                dadaHtml = str1 + dataHtmlComponent + str2;

                fs.writeFile(__dirname + '\\project-dist\\index.html', dadaHtml, function(error){
                  if(error) throw error;
                });
            
              }); 
          }
        }
      });
  });

fs.mkdir(__dirname + '\\project-dist\\assets\\fonts',{ recursive: true }, function() {
  fsp.readdir(__dirname + '\\assets\\fonts')
    .then(fileIns => {
      for (let fileIndir of fileIns) {
        fsp.copyFile(__dirname + '\\assets\\fonts\\' + fileIndir, __dirname + '\\project-dist\\assets\\fonts\\' + fileIndir);  
      }
    });
});

fs.mkdir(__dirname + '\\project-dist\\assets\\img',{ recursive: true }, function() {
  fsp.readdir(__dirname + '\\assets\\img')
    .then(fileIns => {
      for (let fileIndir of fileIns) {
        fsp.copyFile(__dirname + '\\assets\\img\\' + fileIndir, __dirname + '\\project-dist\\assets\\img\\' + fileIndir);  
      }
    });
});

fs.mkdir(__dirname + '\\project-dist\\assets\\svg', { recursive: true },function() {
  fsp.readdir(__dirname + '\\assets\\svg')
    .then(fileIns => {
      for (let fileIndir of fileIns) {
        fsp.copyFile(__dirname + '\\assets\\svg\\' + fileIndir, __dirname + '\\project-dist\\assets\\svg\\' + fileIndir);  
      }
    });
});