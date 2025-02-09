const fs = require('fs-extra');
const path = require('path');

// Copy the public folder
fs.copySync(
  path.join(__dirname, '../public'),
  path.join(__dirname, '../build'),
  { 
    overwrite: true,
    filter: (src) => {
      return !src.endsWith('index.html');
    }
  }
);

// Copy content folder from src to build
fs.copySync(
  path.join(__dirname, '../src/content'),
  path.join(__dirname, '../build/content'),
  { 
    overwrite: true
  }
);

// Create .nojekyll
fs.writeFileSync(
  path.join(__dirname, '../build/.nojekyll'),
  ''
);

console.log('All content copied to build folder'); 