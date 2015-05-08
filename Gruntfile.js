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
                    "src/layout/UI.Panel.js",
                    "src/utils/UI.DateUtils.js",
                    "src/fab//UI.Fab.js",
                    "src/fab/UI.FabProgress.js",
                    "src/layout/UI.Material.js",
                    "src/list/UI.List.js",
                    "src/form/UI.Form.js",
                    "src/form/UI.TextFormField.js",
                    "src/form/UI.LookupFormField.js",
                    "src/form/UI.ListFormField.js",
                    "src/form/UI.FileFormField.js",
                    "src/form/UI.DatePicker.js",
                    "src/form/UI.DateFormField.js",
                    "src/form/UI.BooleanFormField.js",
                    "src/form/UI.PasswordFormField.js",
                    "src/layout//UI.BorderLayout.js",
                    "src/widgets/UI.Crud.js",
                    "src/menu/UI.Menu.js",
                    "src/utils/UI.ProgressBar.js",
                    "src/grid/UI.Grid.js",
                    "src/tabs/UI.IconToolbar.js",
                    "src/tabs/UI.BreadCrumb.js",
                    "src/tabs/UI.Toolbar.js",
                    "src/tabs/UI.Tabs.js"
                ], 
                dest: 'dest/bardia.js'},
            ]
        },
        css: {
            files: [{
            	src: [
                    'src/**/*.css'
                ],
                dest: 'dest/bardia.css'},
            ]        	
        }
      },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'concat']);

};