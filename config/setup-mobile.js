const exec = require('child_process').exec;
const ncp = require('ncp').ncp;
const rimraf = require('rimraf');
const fs = require('fs');
const path = require('path');

const pkg = require(path.join(process.cwd(), 'package.json'));
// const cordovaTemp = path.join(process.cwd(), 'cordova');
const root = path.join(process.cwd());
const cmd = `cordova create cordova ${pkg.identifier} "${pkg.title}"`;

// Run command to create cordova in a temporary directory
exec(cmd, (error) => {
  if (error) throw error;

  // Remove cordovas www folder
  rimraf(`${root}/cordova/www`, (error) => {
    if (error) throw error;

    // Create symlink www to point to dist
    fs.symlink(`${root}/dist`, `${root}/cordova/www`, 'dir', (error) => {
      if (error) throw error;
    });
  });
});
