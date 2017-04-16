const exec = require('child_process').exec;
const ncp = require('ncp').ncp;
const rimraf = require('rimraf');
const fs = require('fs');
const path = require('path');

const pkg = require(path.join(process.cwd(), 'package.json'));
// const cordovaTemp = path.join(process.cwd(), 'cordova');
const root = path.join(process.cwd());
const localNodeBin = path.join(process.cwd(), 'node_modules/.bin/')
const cmd = `${localNodeBin}cordova create cordova ${pkg.identifier} "${pkg.title}"`;

// Run command to create cordova in a temporary directory
exec(cmd, (error) => {
  if (error) throw error;
});
