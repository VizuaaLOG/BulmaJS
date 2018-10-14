const { execSync } = require('child_process');

let version = process.env.npm_package_version.split('.');
version = version[0] + '.' + version[1];

console.log('Building docs JS for version ' + version);

execSync('npm run dev');

console.log('Removing existing files: docs/assets/js/bulmajs/' + version);

execSync('rm -rf docs/assets/js/bulmajs/' + version);

console.log('Creating new directory');

execSync('mkdir -p docs/assets/js/bulmajs/' + version);

console.log('Copying new files');

execSync('cp dist/* docs/assets/js/bulmajs/' + version);

console.log('Done');