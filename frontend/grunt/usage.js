'use strict';

module.exports = function(grunt) {

  grunt.registerTask('usage', function () {
    var usage =
      '\n'+
      'Usage:\n' +
      '  you have read the README.md right?\n';
    return grunt.log.write(usage);
  });

};
