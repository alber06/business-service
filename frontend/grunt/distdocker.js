'use strict';

module.exports = function(grunt) {

  grunt.registerTask('distdocker', function (target) {
    var validTargets = ['dev'];
    if (validTargets.indexOf(target) < 0) {
      var usage =
        '\n'+
        'Usage: "distdocker:mytargetenv"\n' +
        'where mytargetenv can be one of: \n' +
        ' - dev   for development\n';
      return grunt.fatal(usage);
    }

    grunt.task.run([
      'clean:docker',
      'build:' + target,
      'copy:docker',
      'compress:docker'
    ]);
  });

};
