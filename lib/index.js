'use strict';

var readdirSync = require('./sync');
var readdirAsync = require('./async');
var readdirStream = require('./stream');

module.exports = exports = readdirAsyncPath;
exports.readdir = exports.readdirAsync = exports.async = readdirAsyncPath;
exports.readdirAsyncStat = exports.async.stat = readdirAsyncStat;
exports.readdirStream = exports.stream = readdirStreamPath;
exports.readdirStreamStat = exports.stream.stat = readdirStreamStat;
exports.readdirSync = exports.sync = readdirSyncPath;
exports.readdirSyncStat = exports.sync.stat = readdirSyncStat;

/**
 * Synchronous readdir that returns an array of string paths.
 *
 * @param {string} dir
 * @param {object} [options]
 * @returns {string[]}
 */
function readdirSyncPath(dir, options) {
  return readdirSync(dir, options, pathMap);
}

/**
 * Synchronous readdir that returns results as an array of {@link fs.Stats} objects
 *
 * @param {string} dir
 * @param {object} [options]
 * @returns {fs.Stats[]}
 */
function readdirSyncStat(dir, options) {
  return readdirSync(dir, options);
}

/**
 * Aynchronous readdir (accepts an error-first callback or returns a {@link Promise}).
 * Results are an array of path strings.
 *
 * @param {string} dir
 * @param {object} [options]
 * @param {function} [callback]
 * @returns {Promise<string[]>}
 */
function readdirAsyncPath(dir, options, callback) {
  return readdirAsync(dir, options, callback, pathMap);
}

/**
 * Aynchronous readdir (accepts an error-first callback or returns a {@link Promise}).
 * Results are an array of {@link fs.Stats} objects.
 *
 * @param {string} dir
 * @param {object} [options]
 * @param {function} [callback]
 * @returns {Promise<fs.Stats[]>}
 */
function readdirAsyncStat(dir, options, callback) {
  return readdirAsync(dir, options, callback);
}

/**
 * Aynchronous readdir that returns a {@link stream.Readable} (which is also an {@link EventEmitter}).
 * All stream data events ("data", "file", "directory", "symlink") are passed a path string.
 *
 * @param {string} dir
 * @param {object} [options]
 * @returns {stream.Readable}
 */
function readdirStreamPath(dir, options) {
  return readdirStream(dir, options, pathMap);
}

/**
 * Aynchronous readdir that returns a {@link stream.Readable} (which is also an {@link EventEmitter})
 * All stream data events ("data", "file", "directory", "symlink") are passed an {@link fs.Stats} object.
 *
 * @param {string} dir
 * @param {object} [options]
 * @returns {stream.Readable}
 */
function readdirStreamStat(dir, options) {
  return readdirStream(dir, options);
}

/**
 * Returns only the path of the given {@link fs.Stats} object.
 *
 * @param {fs.Stats} stat
 * @returns {string}
 */
function pathMap(stat) {
  return stat.path;
}