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

// Ensure .nojekyll exists in build
fs.writeFileSync(
  path.join(__dirname, '../build/.nojekyll'),
  ''
);

console.log('Public folder contents and .nojekyll copied to build folder'); 