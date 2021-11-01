"use strict"
let fs = require('fs-extra');
let replace = require('replace-in-file');

let baseUrl = process.env.BASE_URL || '/';

if(baseUrl.charAt(baseUrl.length-1) != '/' && baseUrl!='/'){
    baseUrl = baseUrl+'/';
}

if(baseUrl.charAt(0)!='/' && baseUrl!='/'){
    baseUrl = "/"+baseUrl;
}

console.log(baseUrl);

// Process public directory based on baseUrl
if(fs.pathExists('public')){
    fs.rmdirSync('public', { recursive: true });
}

try {
  var pathTarget="public/"+baseUrl;
  fs.mkdirSync(pathTarget, { recursive: true });
  fs.copySync('templates/public/', pathTarget)
  console.log('public copy success!')
} catch (err) {
  console.error(err)
}

// Process view directory based on baseUrl and string replace
if(fs.pathExists('views')){
    fs.rmdirSync('views', { recursive: true });
}
try {
  fs.copySync('templates/views/', 'views')
  console.log('views copy success!')
} catch (err) {
  console.error(err)
}

const options = {
  files: [
    'views/**/*',
    'public/**/*',
  ],
  from: /{{base-url}}/g,
  to: baseUrl,
};

try {
  const results = replace.sync(options);
  console.debug('Replacement results:', results);
}
catch (error) {
  console.error('Error occurred:', error);
}