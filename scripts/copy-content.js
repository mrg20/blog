const fs = require('fs-extra');
const path = require('path');

// Copy content folder to build
fs.copySync(
  path.join(__dirname, '../public/content'),
  path.join(__dirname, '../build/content'),
  { overwrite: true }
);

console.log('Content files copied to build folder'); 