#Personnal Kickstart#

*A way to save my configuration and to init projects*

##Sublime Text Setup##

###Package Control###
*A better way to handle plugins*

[Installation](https://sublime.wbond.net/installation)

###Emmet###
*HTML helper*

[Installation](https://github.com/sergeche/emmet-sublime)


##Gulp workflow##
src: [Mark Goodyear](http://markgoodyear.com/2014/01/getting-started-with-gulp/)

First init project in node. Go to folder:

        npm init

Package.json is created. Then, install it:
        
        npm install

For full installation of gulp, please refer to the official repo: [Gulp on GitHub](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

To install plugins manually:

        npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-concat gulp-uglify gulp-imagemin gulp-rename gulp-livereload tiny-lr gulp-cache gulp-plumber gulp-watch gulp-iconfont gulp-iconfont-css gulp-combine-media-queries --save-dev

Based on a specific organisation:


				Project
		        ├── css
		        │   ├── main.css
		        │   └── main.min.css
		        ├── img
		        │   ├── favicon
		        │   │   └── ...
		        │   ├── original
		        │   │   └── ...
				│   ├── svg
		        │   │   └── ...
		        │   └── ...
		        ├── inc
		        │   └── ...
		        ├── js
		        │   ├── vendor
		        │   │   └── ...
		        │   ├── main.js
		        │   └── main.min.js
		        ├── sass
		        │   ├── _forms.scss
		        │   ├── _fonts.scss
		        │   ├── _glyphicons.scss
		        │   ├── _common.scss
		        │   ├── _print.scss
		        │   ├── _reset.scss
		        │   ├── _typo.scss
		        │   ├── _variables.scss
		        │   ├── _mixins.scss
		        │   └── main.scss
		        ├── index.html
		        ├── package.json
		        └── gulpfile.js

What is doing Gulp?
- Sassify all files, autoprefix it, create main.css, then minify it into main.min.css
- Take all js except vendor, concatenate it, minify and rename it into main.min.js
- Take images located in img/original, copy it in img/ and minify it
- Livereload all


Further reading:

[Mark Goodyear](http://markgoodyear.com/2014/01/getting-started-with-gulp/)
[Travis Maynard](http://travismaynard.com/writing/getting-started-with-gulp)

