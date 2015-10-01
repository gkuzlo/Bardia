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
        js_mdl: {
          files: [{
        	    src: [
                    "src/bardia/$_bardia.js",

                    "src/bardia/oop/$_oop.js",
                    "src/bardia/oop/Class.js",

                    "src/bardia/dom/$_dom.js",
                    "src/bardia/dom/Element.js",

                    "src/bardia/$_variants/$_mdl/$_mdl.js",

                    "src/bardia/$_variants/$_mdl/layout/$_layout.js",
                    "src/bardia/$_variants/$_mdl/layout/BorderLayout.js",
                    "src/bardia/$_variants/$_mdl/layout/Material.js",
                    "src/bardia/$_variants/$_mdl/layout/Panel.js",

                    "src/bardia/$_variants/$_mdl/list/$_list.js",
                    "src/bardia/$_variants/$_mdl/list/List.js",
                    "src/bardia/$_variants/$_mdl/list/MobileList.js",
                    
                    "src/bardia/$_variants/$_mdl/grid/$_grid.js",
                    "src/bardia/$_variants/$_mdl/grid/Grid.js",
                    
                    "src/bardia/$_variants/$_mdl/form/$_form.js",
                    "src/bardia/$_variants/$_mdl/form/Form.js",
                    "src/bardia/$_variants/$_mdl/form/TextField.js",
                    "src/bardia/$_variants/$_mdl/form/DateField.js",

                ], 
                dest: 'dist/mdl/bardia.js'},
            ]
        },
        css_mdl: {
            files: [{
            	src: [
                    "src/bardia/**/*.css",
                    "mdl/material.min.css",
                ],
                dest: 'dist/mdl/bardia.css'},
            ]        	
        },
        js_materialize: {
          files: [{
        	    src: [
                    "src/bardia/$_bardia.js",

                    "src/bardia/oop/$_oop.js",
                    "src/bardia/oop/Class.js",

                    "src/bardia/dom/$_dom.js",
                    "src/bardia/dom/Element.js",

                    "src/bardia/$_variants/$_mdl/$_mdl.js",

                    "src/bardia/$_variants/$_mdl/layout/$_layout.js",
                    "src/bardia/$_variants/$_mdl/layout/BorderLayout.js",
                    "src/bardia/$_variants/$_mdl/layout/Material.js",
                    "src/bardia/$_variants/$_mdl/layout/Panel.js",

                    "src/bardia/$_variants/$_mdl/list/$_list.js",
                    "src/bardia/$_variants/$_mdl/list/List.js",
                    "src/bardia/$_variants/$_materialize/list/MobileList.js",

                    "src/bardia/$_variants/$_mdl/grid/$_grid.js",
                    "src/bardia/$_variants/$_mdl/grid/Grid.js",

                ], 
                dest: 'dist/materialize/bardia.js'},
            ]
        },
        css_materialize: {
            files: [{
            	src: [
                    "src/bardia/**/*.css",
                    "mdl/material.min.css",
                ],
                dest: 'dist/materialize/bardia.css'},
            ]        	
        },
      },
      yuidoc: {
          all: {
              name: 'Bardia',
              description: 'Bardia',
              version: '1.0',
              url: '1.0',
              options: {
                  paths: ['dist'],
                  outdir: 'docs/'
              }
          }
      }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks("grunt-contrib-yuidoc");

  // Default task(s).
  grunt.registerTask('mdl', ['concat:js_mdl', 'concat:css_mdl', "yuidoc"]);
  grunt.registerTask('mat', ['concat:js_materialize', 'concat:css_materialize', "yuidoc"]);

};