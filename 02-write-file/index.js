// node 02-write-file

const fs = require('fs');
const path = require('path');
let writeableStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));
writeableStream.write('');
const { stdin, stdout } = process;
stdout.write('Введите текст\n');
stdin.on('data', data => {
  if (data.toString().slice(0, -2) == 'exit') {
    stdout.write('До свидания!\n');
    process.exit();
  }
});
process.on('SIGINT', () => {
  stdout.write('До свидания!\n');
  process.exit();
});
stdin.on('data', data => {writeableStream.write(data);});