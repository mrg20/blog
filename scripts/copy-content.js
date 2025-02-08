const fs = require('fs-extra');
const path = require('path');

// Copy the entire public folder to build
fs.copySync(
  path.join(__dirname, '../public'),
  path.join(__dirname, '../build'),
  { 
    overwrite: true,
    filter: (src) => {
      // Skip index.html as it's already handled by CRA
      return !src.endsWith('index.html');
    }
  }
);

console.log('Public folder contents copied to build folder'); 