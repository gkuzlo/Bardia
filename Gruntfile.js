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
                    "src/UI.js",
                    "src/icon/UI.IconSet.js",
                    "src/material/UI.MaterialComponent.js",
                    "src/layout/UI.PanelButton.js",
                    "src/layout/UI.PanelToolbar.js",
                    "src/layout/UI.Panel.js",
                    "src/utils/UI.DateUtils.js",
                    "src/utils/UI.DatePicker.js",
                    "src/fab//UI.Fab.js",
                    "src/fab/UI.FabProgress.js",
                    "src/fab/UI.FabToolbar.js",
                    "src/layout/UI.Material.js",
                    "src/list/UI.List.js",
                    "src/list/UI.SortableList.js",
                    "src/form/UI.Form.js",
                    "src/form/UI.TextFormField.js",
                    "src/form/UI.LongTextFormField.js",
                    "src/form/UI.LookupFormField.js",
                    "src/form/UI.ListFormField.js",
                    "src/form/UI.FileFormField.js",
                    "src/form/UI.DateFormField.js",
                    "src/form/UI.BooleanFormField.js",
                    "src/form/UI.PasswordFormField.js",
                    "src/form/UI.IntegerFormField.js",
                    "src/form/UI.DecimalFormField.js",
                    "src/layout/UI.BorderLayout.js",
                    "src/widgets/UI.Crud.js",
                    "src/menu/UI.Menu.js",
                    "src/utils/UI.ProgressBar.js",
                    "src/grid/UI.Grid.js",
                    "src/grid/UI.GridCell.js",
                    "src/grid/UI.GridInputCell.js",
                    "src/tabs/UI.IconToolbar.js",
                    "src/tabs/UI.BreadCrumb.js",
                    "src/tabs/UI.Toolbar.js",
                    "src/tabs/UI.Tabs.js",
					"mdl/material.min.js",
                ], 
                dest: 'dist/bardia.js'},
            ]
        },
        css: {
            files: [{
            	src: [
                    "src/**/*.css",
                    "mdl/material.min.css",
                ],
                dest: 'dist/bardia.css'},
            ]        	
        },
      },
      jsdoc : {
          dist : {
              src: ['dist/bardia.js'],
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
                  paths: ['dist'],
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