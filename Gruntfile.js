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
    	js_min: {
    	   files: [{
	    	   src: [
	                "src/bardia/$_bardia.js",

	                "src/bardia/oop/$_oop.js",
	                "src/bardia/oop/Class.js",

	                "src/bardia/dom/$_dom.js",
	                "src/bardia/dom/Element.js",
	                
	                "src/bardia/$_variants/$_mdl/$_mdl.js",

                    "src/bardia/$_variants/$_mdl/utils/$_utils.js",
                    "src/bardia/$_variants/$_mdl/utils/DateUtils.js",
                    "src/bardia/$_variants/$_mdl/utils/Map.js",
	           ], 
	           dest: 'dist/mdl/bardia-min.js'
    	   }]
    	},
        js_mdl: {
          files: [{
        	    src: [
        	        "src/jst/JavaScriptUtil.js",
        	        "src/jst/InputMask.js",
        	        "src/jst/Parsers.js",

                    "src/bardia/$_bardia.js",

                    "src/bardia/oop/$_oop.js",
                    "src/bardia/oop/Class.js",

                    "src/bardia/dom/$_dom.js",
                    "src/bardia/dom/Element.js",

                    "src/bardia/$_variants/$_mdl/$_mdl.js",

                    "src/bardia/$_variants/$_mdl/cmn/$_package.js",
                    "src/bardia/$_variants/$_mdl/cmn/ProgressBar.js",
                    
                    "src/bardia/$_variants/$_mdl/utils/$_utils.js",
                    "src/bardia/$_variants/$_mdl/utils/DateUtils.js",
                    "src/bardia/$_variants/$_mdl/utils/Map.js",

                    "src/bardia/$_variants/$_mdl/controlls/$_package.js",
                    "src/bardia/$_variants/$_mdl/controlls/CheckBox.js",
                    "src/bardia/$_variants/$_mdl/controlls/StateBox.js",
                    "src/bardia/$_variants/$_mdl/controlls/ScrollingCell.js",
                    
                    "src/bardia/$_variants/$_mdl/layout/$_layout.js",
                    "src/bardia/$_variants/$_mdl/layout/BorderLayout.js",
                    "src/bardia/$_variants/$_mdl/layout/Material.js",
                    "src/bardia/$_variants/$_mdl/layout/Panel.js",
                    "src/bardia/$_variants/$_mdl/layout/BreadCrumb.js",
                    "src/bardia/$_variants/$_mdl/layout/Tabs.js",

                    "src/bardia/$_variants/$_mdl/list/$_list.js",
                    "src/bardia/$_variants/$_mdl/list/List.js",
                    "src/bardia/$_variants/$_mdl/list/MobileList.js",
                    
                    "src/bardia/$_variants/$_mdl/grid/$_grid.js",
                    "src/bardia/$_variants/$_mdl/grid/Grid.js",

                    "src/bardia/$_variants/$_mdl/form/$_form.js",
                    "src/bardia/$_variants/$_mdl/form/Form.js",
                    "src/bardia/$_variants/$_mdl/form/TextField.js",
                    "src/bardia/$_variants/$_mdl/form/ActionField.js",
                    "src/bardia/$_variants/$_mdl/form/DateField.js",
                    "src/bardia/$_variants/$_mdl/form/LookupField.js",
                    "src/bardia/$_variants/$_mdl/form/BooleanField.js",
                    "src/bardia/$_variants/$_mdl/form/StateField.js",
                    "src/bardia/$_variants/$_mdl/form/IntegerField.js",
                    "src/bardia/$_variants/$_mdl/form/FileField.js",
                    "src/bardia/$_variants/$_mdl/form/TextAreaField.js",
                    "src/bardia/$_variants/$_mdl/form/TimeSecField.js",
                    "src/bardia/$_variants/$_mdl/form/PasswordField.js",
                    "src/bardia/$_variants/$_mdl/form/CurrencyField.js",
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
  grunt.registerTask('min', ['concat:js_min']);
  grunt.registerTask('mdl', ['concat:js_mdl', 'concat:css_mdl', "yuidoc"]);
  grunt.registerTask('mat', ['concat:js_materialize', 'concat:css_materialize', "yuidoc"]);

};