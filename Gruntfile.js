module.exports = function( grunt ) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: true
      },
      src: [ 'lib/**/*.js' ]
    },
    eslint: {
      target: [ 'lib/**/*.js' ]
    },
    mocha_istanbul: {
      test: {
        src: 'test/test.js',
        options: {
          reportFormats: [ 'html' ],
          check: {
            lines: 100,
            statements: 100,
            branches: 100,
            functions: 100
          },
          print: 'detail',
          root: 'lib'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-istanbul');
  grunt.registerTask( 'default', [ 'jshint', 'eslint', 'mocha_istanbul' ] );
};
