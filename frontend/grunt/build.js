'use strict';

module.exports = function(grunt) {

  grunt.registerTask('build', function (target) {
    var validTargets = ['dev', 'dist', 'pre', 'pro'];
    if (validTargets.indexOf(target) < 0) {
      var usage =
        '\n'+
        'Usage: "build:mytargetenv"\n' +
        'where mytargetenv can be one of: \n' +
        ' - dev    for development\n' +
        ' - dist   for servedist\n' +
        ' - pre    for pre-production\n' +
        ' - pro    for production\n';
      return grunt.fatal(usage);
    }

    grunt.task.run([
      'clean:reports',
      'clean:dist',
      'newer:jshint',
      'ngconstant:' + target,
      'injector:js',
      'wiredep',
      'useminPrepare',
      'concurrent:dist',
      'karma:singleRun',
      'concat',
      'ngAnnotate',
      'copy:dist',
      'cssmin',
      'uglify',
      'usemin',
      'htmlmin'
    ]);
  });

};
