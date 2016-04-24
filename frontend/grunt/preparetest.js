'use strict';

module.exports = function(grunt) {

  grunt.registerTask('preparetest', function () {
    grunt.task.run([
      'clean:reports',
      'clean:coverage',
      'newer:jshint',
      'ngconstant:dev'
    ]);
  });

};
