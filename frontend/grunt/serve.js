'use strict';

module.exports = function(grunt) {

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build:dist', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'newer:jshint',
      'ngconstant:' + target,
      //'karma:singleRun',
      'injector:js',
      'wiredep',
      'concurrent:server',
      'autoprefixer',
      'ngAnnotate:dev',
      'connect:livereload',
      //'karma:background:start',
      'watch'
    ]);
  });

};
