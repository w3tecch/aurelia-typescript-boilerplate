const rimraf = require('rimraf');
const fs = require('fs');
const path = require('path');

// const cordovaTemp = path.join(process.cwd(), 'cordova');
const root = path.join(process.cwd());

// Remove cordovas www folder
rimraf(`${root}/cordova/www`, (error) => {
  if (error) throw error;

  // Create symlink www to point to dist
  fs.symlink(`${root}/dist`, `${root}/cordova/www`, 'dir', (error) => {
    if (error) throw error;
  });
});
