// node 06-build-page

const fs = require('fs');
const fsp = require('fs').promises;
let path = require('path');
const wayDir = path.join(__dirname, 'styles');
const wayAssets = path.join(__dirname, 'assets');
const wayFonts = path.join(wayAssets, 'fonts');
const wayImg = path.join(wayAssets, 'img');
const waySvg = path.join(wayAssets, 'svg');
const wayDirNew = path.join(__dirname, 'project-dist');
let dadaCss = '';
fs.mkdir(wayDirNew, function() {
  fsp.readdir(wayDir)
    .then(fileIns => {
      for (let i = 0; i < fileIns.length; i++) {
        let wayDirFile = path.join(wayDir, fileIns[i]);
        fs.readFile(wayDirFile, 'utf8', function(error, data){
          if(error) throw error;
    
          if (path.parse(wayDirFile).ext === '.css' ) {
            dadaCss = dadaCss + data + '\n';  
          }
          let wayDirNewFile = path.join(wayDirNew, 'styles.css');
          fs.writeFile(wayDirNewFile, dadaCss, function(error){
            if(error) throw error;
          });
        });
      }
    });
});
let dadaHtml = '';
let nameHtml = '';
fsp.readFile(path.join(__dirname, 'template.html'), 'utf8')
  .then(data => {
    dadaHtml = data;
    let wayComponents = path.join(__dirname, 'components');
    fsp.readdir(wayComponents)
      .then(fileIns => {
        for (let i = 0; i < fileIns.length; i++) {
          let wayFileComponents = path.join(wayComponents, fileIns[i]);
          if (path.parse(wayFileComponents).ext === '.html' ) {
            fsp.readFile(wayFileComponents, 'utf8')
              .then(dataHtmlComponent => {
                nameHtml = path.parse(wayFileComponents).name; 
                let position = dadaHtml.indexOf('{{' + nameHtml + '}}');
                let str1 = dadaHtml.slice(0, position - 2);
                let str2 = dadaHtml.slice(position + nameHtml.length + 4);
                dadaHtml = str1 + dataHtmlComponent + str2;
                const wayIndexNew = path.join(wayDirNew, 'index.html');
                fs.writeFile(wayIndexNew, dadaHtml, function(error){
                  if(error) throw error;
                });
            
              }); 
          }
        }
      });
  });
let wayProjectFonts = path.join(path.join(wayDirNew, 'assets'), 'fonts');
fs.mkdir(wayProjectFonts,{ recursive: true }, function() {
  fsp.readdir(wayFonts)
    .then(fileIns => {
      for (let fileIndir of fileIns) {
        let wayProjectAssets = path.join(wayFonts, fileIndir);
        let wayProjectAssetsNew = path.join(wayProjectFonts, fileIndir);
        fsp.copyFile(wayProjectAssets, wayProjectAssetsNew);  
      }
    });
});
let wayProjectImg = path.join(path.join(wayDirNew, 'assets'), 'img');
fs.mkdir(wayProjectImg,{ recursive: true }, function() {
  fsp.readdir(wayImg)
    .then(fileIns => {
      for (let fileIndir of fileIns) {
        let wayProjectAssets = path.join(wayImg, fileIndir);
        let wayProjectAssetsNew = path.join(wayProjectImg, fileIndir);
        fsp.copyFile(wayProjectAssets, wayProjectAssetsNew); 
      }
    });
});
let wayProjectSvg = path.join(path.join(wayDirNew, 'assets'), 'svg');
fs.mkdir(wayProjectSvg, { recursive: true },function() {
  fsp.readdir(waySvg)
    .then(fileIns => {
      for (let fileIndir of fileIns) {
        let wayProjectAssets = path.join(waySvg, fileIndir);
        let wayProjectAssetsNew = path.join(wayProjectSvg, fileIndir);
        fsp.copyFile(wayProjectAssets, wayProjectAssetsNew); 
      }
    });
});