module.exports = function(grunt) {

  // Import 
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
		    	outputStyle: 'compressed'
		  }
		},
		dev: {                   
			options: {
		        sassDir: 'sass',
		    	cssDir: 'css',
		    	imagesDir: 'img',
		    	outputStyle: 'expanded',
		    	noLineComments: true
			}
		}
	},
	autoprefixer: {
		no_dest: {
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
	 	dev: {
			files: ['sass/*.scss'],
			tasks: ['dev']
	  	},
	  	prod: {
			files: ['js/*.js', '/js/vendor/*.js', 'sass/*.scss', '*.html'],
			tasks: ['prod']
	  	}
	}
  })

  //Enregistrement des tâches et assignations

  grunt.registerTask('default', ['dev', 'watch:dev'])
  grunt.registerTask('prod', ['dist', 'watch:prod'])
  grunt.registerTask('dev', ['compass:dev', 'autoprefixer:no_dest'])
  grunt.registerTask('prod', ['compass:dist', 'autoprefixer:no_dest', 'concat:compile', 'uglify:compile'])
}