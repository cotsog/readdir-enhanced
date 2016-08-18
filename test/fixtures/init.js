'use strict';

var mkdirp = require('mkdirp');
var del = require('del');
var path = require('path');
var fs = require('fs');

before(function() {
  // create some empty dirs (cannot check-in empty dirs to git)
  mkdirp.sync('test/dir/empty');
  mkdirp.sync('test/dir/subdir/.dotdir/empty');

  // create symlinks (checking symlinks into git is problematic cross-platform)
  symlink('test/dir/file.txt', 'test/dir/file-symlink.txt', 'file');
  symlink('test/dir/subdir/subsubdir/file.txt', 'test/dir/subdir/subsubdir/file-symlink.txt', 'file');
  symlink('test/dir/subdir', 'test/dir/subdir-symlink', 'dir');
  symlink('test/dir/subdir/subsubdir', 'test/dir/subsubdir-symlink', 'dir');

  // create broken symlinks (checking broken symlinks into git is problematic)
  brokenSymlink('test/dir/broken-symlink.txt');
  brokenSymlink('test/dir/subdir/subsubdir/broken-symlink.txt');

  // delete files that get created automatically by the OS
  del.sync('test/dir/**/.DS_Store', {dot: true});
  del.sync('test/dir/**/Thumbs.db', {dot: true});
});

/**
 * Creates (or re-creates) a symbolic link.
 * If the symlink already exists, it is re-created, in case paths or permissions have changed.
 */
function symlink(targetPath, linkPath, type) {
  try {
    var stats = fs.lstatSync(linkPath);
    if (stats.isSymbolicLink()) {
      fs.unlinkSync(linkPath);
    }
    else {
      throw new Error(linkPath + ' already exists and is not a symbolic link');
    }
  }
  catch (e) {
    if (e.code !== 'ENOENT') {
      throw e;
    }
  }

  targetPath = path.resolve(targetPath);
  fs.symlinkSync(targetPath, linkPath, type);
}

/**
 * Creates (or re-creates) a broken symbolic link.
 */
function brokenSymlink(linkPath) {
  var tmpFile = path.join(path.dirname(linkPath), Date.now() + '.txt');
  fs.writeFileSync(tmpFile, '');
  symlink(tmpFile, linkPath, 'file');
  fs.unlinkSync(tmpFile);
}
