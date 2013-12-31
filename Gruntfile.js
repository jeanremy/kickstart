module.exports = function(grunt) {

  // Je préfère définir mes imports tout en haut
  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-contrib-compass')
  grunt.loadNpmTasks('grunt-contrib-concat')  
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-autoprefixer')
  grunt.loadNpmTasks('grunt-contrib-watch')

  var jsSrc = ['js/*.js', 'js/vendor/*.js']
	, jsDist = 'js/main.min.js'

  // Configuration de Grunt
  grunt.initConfig({
	compass: {                  
		dist: {                   
		  	options: {            
		   		sassDir: 'sass',
		    	cssDir: 'css',
		    	imagesDir: 'img',
		    	outputStyle: 'compressed',
		    	watch: true
		  }
		},
		dev: {                   
			options: {
		        sassDir: 'sass',
		    	cssDir: 'css',
		    	imagesDir: 'img',
		    	outputStyle: 'expanded',
		    	noLineComments: true,
		    	watch: true
			}
		}
	},
	autoprefixer: {
		multiple_files: {
	      	expand: true,
	      	flatten: true,
	      	src: 'css/*.css'
	    }
	},
	concat: {
		options: {
			separator: ';'
	  	},
	  	compile: { 
			src: jsSrc, 
			dest: jsDist 
	  	}
	},
	uglify: {
	  	options: {
			separator: ';'
	  	},
	  	compile: {
			src: jsSrc,
			dest: jsDist
	  	}
	},
	watch: {
	 	scripts: {
			files: '**/*.js',
			tasks: ['scripts:dev'],
		    options: {
		    	livereload: true,
		    }
	  	},
	  	styles: {
			files: '**/*.scss',
			tasks: ['styles:dev'],
		    options: {
		    	livereload: true,
		    }
	  	}
	}
  })

  //Enregistrement des tâches et assignations

  grunt.registerTask('default', ['dev', 'watch'])
  grunt.registerTask('prod', ['dist', 'watch'])
  grunt.registerTask('dev', ['styles:dev', 'scripts:dev'])
  grunt.registerTask('dist', ['styles:dist', 'scripts:dist'])


  grunt.registerTask('scripts:dev', ['concat:compile'])
  grunt.registerTask('scripts:dist', ['uglify:compile'])

  grunt.registerTask('styles:dev', ['compass:dev', 'autoprefixer:multiple_files'])
  grunt.registerTask('styles:dist', ['compass:dist', 'autoprefixer:multiple_files'])
}