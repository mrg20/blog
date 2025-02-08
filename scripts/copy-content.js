const fs = require('fs-extra');
const path = require('path');

// Copy the entire public folder to build
fs.copySync(
  path.join(__dirname, '../public'),
  path.join(__dirname, '../build'),
  { overwrite: true }
);

console.log('Public folder contents copied to build folder'); 