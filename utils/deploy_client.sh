#!/usr/bin/env bash
sudo npm install -g bower
sudo npm install -g gulp
bower install
npm install --save-dev gulp
npm install --save-dev gulp-concat
npm install --save-dev gulp-uncss
npm install --save-dev gulp-uglify
gulp build