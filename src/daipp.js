// We depend on webppl making the following global variables
// available:

// * dists
// * util
// * ad
// * nn
// * T

var rnn = require('./rnn');

module.exports = function(env) {

  var config = {
    debug: true, // Enable debug checks for nets?
    latentSize: 10, // Sets the size of the context net throughout.
    useXavierInit: false // Use Xavier weight init. when true, otherwise use adnn default.
  };

  // Core daipp functions.

  var val2vec = require('./val2vec')(env, config);
  var vec2dist = require('./vec2dist')(env, config);
  var nneval = require('./nneval')(env, config);

  // Other helpers.

  // Returns the part of the stack address which has been added since
  // entering the inner-most mapData. Outside of any mapData the
  // address relative to the inner-most coroutine is returned.

  // The magic string '$$' comes from the implementation of
  // `wpplCpsMapWithAddresses`. We need to make this less brittle. One
  // obvious thing we might do is move this function into webppl so
  // that we reduce the likelihood that the string is changed in only
  // one place.

  function getObsFnAddress(s, k, a) {
    var rel = util.relativizeAddress(env, a);
    return k(s, rel.slice(rel.indexOf('_', rel.lastIndexOf('$$'))));
  }

  function orderedValues(obj) {
    return Object.keys(obj).sort().map(function(key) {
      return obj[key];
    });
  }

  return {
    daipp: {
      debug: config.debug,
      latentSize: config.latentSize,
      val2vec: val2vec,
      vec2dist: vec2dist,
      nneval: nneval,
      orderedValues: orderedValues,
      makeRU: rnn.makeRU
    },
    getObsFnAddress: getObsFnAddress
  };

};
