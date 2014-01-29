# Kickstarter base for small projects #

## Créer un projet avec Grunt ##
Src: [Super tuto de Putain de code](http://putaindecode.fr/posts/js/premiers-pas-avec-grunt/)

D'abord, initialiser le projet en node js
Node va créer un json avec les paramètres du projet.
Pour cela, aller dans le répertoire, et faire npm init, puis entrée plusieurs fois
Le Json est créé.

Ensuite, installer Grunt puis l'installer dans le projet
        npm install -g grunt-cli
        npm install grunt --save-dev

Ensuite, on crée un fichier de config grunt
touch Gruntfile.js ne marche pas, le créer à la main, et coller ça:
        module.exports = function(grunt) {

          // Configuration de Grunt
          grunt.initConfig({})

          // Définition des tâches Grunt
          grunt.registerTask('default', '')

        }

/*Dépendances et paquets*/


On installe compass:
        npm install grunt-contrib-compass --save-dev

On installe un compresseur de fichiers
        npm install grunt-contrib-uglify --save-dev

On installe le moyen de watcher les fichiers
        npm install grunt-contrib-watch --save-dev

On installe autoprefixer
        npm install grunt-autoprefixer --save-dev

On installe Image min
        npm install grunt-contrib-imagemin --save-dev

Désormais il suffit de lancer grunt tout court, watch étant la tâche par défaut. (Une seule tâche)

[--save-dev permet de sauvegarder le package dans package.json pour pouvoir à tout moment le réinstaller en faisant npm install]

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
    }