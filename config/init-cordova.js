const exec = require('child_process').exec;
const ncp = require('ncp').ncp;
const rimraf = require('rimraf');
const fs = require('fs');
const path = require('path');

const pkg = require(path.join(process.cwd(), 'package.json'));
const cordovaTemp = path.join(process.cwd(), 'cordova');
const cordovaTarget = path.join(process.cwd());
const cmd = `cordova create ${cordovaTemp} ch.w3tec.aurelia "${pkg.title}"`;

// Run command to create cordova in a temporary directory
exec(cmd, (error) => {
  if (error) throw error;

  // Copy cordova code to project root
  ncp(`${cordovaTemp}`, cordovaTarget, (error, files) => {
    if (error) throw error;

    // Remove temporary directory
    rimraf(cordovaTemp, (error) => {
      if (error) throw error;

      // Remove cordovas www folder
      rimraf(`${cordovaTarget}/www`, (error) => {
        if (error) throw error;

        // Create symlink www to point to dist
        fs.symlink(`${cordovaTarget}/dist`, `${cordovaTarget}/www`, 'dir', (error) => {
          if (error) throw error;
        });
      });
    });
  });
});