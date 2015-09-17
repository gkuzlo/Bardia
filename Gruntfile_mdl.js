module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
	    static_mappings: {
	      files: [
	        {src: 'src/UI.js',     dest: 'build/UI.min.js'},
	        {src: 'src/UI.Crud.js', dest: 'build/UI.Crud.min.js'},
	      ]
	    }
    },
    concat: {
        js: {
          files: [{
        	    src: [
                    "src/bardia/bardia.js",
                    
                    "src/bardia/oop/oop.js",
                    "src/bardia/oop/Class.js",
                    
                    "src/bardia/layout/layout.js",
                    "src/bardia/layout/BorderLayout.js",
                ], 
                dest: 'dist_mdl/bardia_mdl.js'},
            ]
        },
        css: {
            files: [{
            	src: [
                    "src/**/*.css",
                    "mdl/material.min.css",
                ],
                dest: 'dist_mdl/bardia.css'},
            ]        	
        },
      },
      jsdoc : {
          dist : {
              src: ['dist_mdl/bardia.js'],
              options: {
                  destination: 'doc'
              }
          }
      },
      yuidoc: {
          all: {
              name: 'Bardia',
              description: 'Bardia',
              version: '1.0',
              url: '1.0',
              options: {
                  paths: ['dist_mdl'],
                  outdir: 'docs/'
              }
          }
      }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks("grunt-contrib-yuidoc");

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'concat']);

};