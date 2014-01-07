module.exports = function(grunt) {

  // Import 
  grunt.loadNpmTasks('grunt-contrib-compass')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-autoprefixer')
  grunt.loadNpmTasks('grunt-contrib-watch')


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
  Changement radical: une seule tâche, un watch global pour avoir le livereload;
  On oublie la concatenation, car ça oblige à regouper tous les js, 
  y compris modernizr dans un fichier;
  On uglifie le main en main.min, directement lié dans le html
  Le style est lui aussi minifié directement via compass
  */
}