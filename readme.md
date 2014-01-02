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


Mieux, on installe compass:
  npm install grunt-contrib-compass --save-dev

On installe un moyen de concatener ses fichiers js
  npm install grunt-contrib-concat --save-dev

On installe un compresseur de fichiers
  npm install grunt-contrib-uglify --save-dev

On installe le moyen de watcher les fichiers
  npm install grunt-contrib-watch --save-dev

On installe autoprefixer
  npm install grunt-autoprefixer --save-dev

Désormais il suffit de lancer grunt tout court, watch étant la tâche par défaut
Si on fait grunt, il lance la tache dist, grunt dev lance la dev, etc. A creuser.

[--save-dev permet de sauvegarder le package dans package.json pour pouvoir à tout moment le réinstaller en faisant npm install]

Le fichiers de config ressemble à ça, avec deux tâches, un dev et une prod ! Attention, compass non intégré !

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