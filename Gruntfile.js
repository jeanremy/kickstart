module.exports = function(grunt) {

  // Import 
  grunt.loadNpmTasks('grunt-contrib-compass')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-autoprefixer')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-imagemin');


  // Configuration de Grunt
  grunt.initConfig({
	compass: {
		all: {                    
			options: {            
		   		sassDir: 'sass',
		    	cssDir: 'css',
		    	imagesDir: 'img',
		    	outputStyle: 'compressed'
			}
		}
	},
	autoprefixer: {
		no_dest: {
	    	src: 'css/*.css'
	    }
	},
	uglify: {
	  	options: {
			separator: ';'
	  	},
	  	compile: {
			src: 'js/main.js',
			dest: 'js/main.min.js'
	  	}
	},
	imagemin: {                         
	    dynamic: {                         // Another target
	      files: [{
	        expand: true,                   // Src matches are relative to this path
	        cwd: 'img/', 
	        src: ['*.{png,jpg,gif}'],   // Actual patterns to match
	        dest: 'img/'                  // Destination path prefix
	      }]
	    }
	},
	watch: {
	  	prod: {
			files: ['js/main.js', '/js/vendor/*.js', 'sass/*.scss', '*.html'],
			tasks: ['task']
	  	},
	  	livereload: {
	      options: { livereload: true },
	      files: ['css/style.css', '*.html', '*.php', 'js/main.min.js'],
	    }
	}
  })

  //Enregistrement des tâches et assignations

  grunt.registerTask('default', 'watch')
  grunt.registerTask('task', ['compass:all', 'autoprefixer:no_dest', 'uglify:compile'])

  //TAF
  /*
  Passer à gulp?
  */
}