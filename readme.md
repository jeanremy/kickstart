# Kickstarter base for small projects #

## Créer un projet avec Grunt ##
Src: http://putaindecode.fr/posts/js/premiers-pas-avec-grunt/

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

On installe sass:
npm install grunt-contrib-sass --save-dev

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

  // Je préfère définir mes imports tout en haut
  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-contrib-concat')  
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')

  var jsSrc = ['src/intro.js', 'src/project.js', 'src/outro.js']
    , jsDist = 'dist/built.js'

  // Configuration de Grunt
  grunt.initConfig({
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          "expand": true,
          "cwd": "src/styles/",
          "src": ["*.scss"],
          "dest": "dist/styles/",
          "ext": ".css"
        }
      },
      dev: {} // A vous de le faire ! vous verrez que certaines options Sass sont plus intéressantes en mode dev que d'autres.
    },
    concat: {
      options: {
        separator: ';'
      },
      compile: { // On renomme vu qu'on a pas de mode dev/dist. Dist étant une autre tâche : uglify
        src: jsSrc, // Vu qu'on doit l'utiliser deux fois, autant en faire une variable.
        dest: jsDist // Il existe des hacks plus intéressants mais ce n'est pas le sujet du post.
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
        tasks: ['scripts:dev']
      },
      styles: {
        files: '**/*.scss',
        tasks: ['styles:dev']
      }
    }
  })

  grunt.registerTask('default', ['dev', 'watch'])
  grunt.registerTask('dev', ['styles:dev', 'scripts:dev'])
  grunt.registerTask('dist', ['styles:dist', 'scripts:dist'])

  // J'aime bien avoir des noms génériques
  grunt.registerTask('scripts:dev', ['concat:compile'])
  grunt.registerTask('scripts:dist', ['uglify:compile'])

  grunt.registerTask('styles:dev', ['sass:dev'])
  grunt.registerTask('styles:dist', ['sass:dist'])
}