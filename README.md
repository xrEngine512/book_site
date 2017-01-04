## Client Deployment
**On Linux run utils/deploy_client.sh** or manual deployment:

1. (sudo) npm install -g bower
2. (sudo) npm install -g gulp
3. bower install
4. npm install --save-dev gulp
5. npm install --save-dev gulp-concat
6. npm install --save-dev gulp-uncss
7. npm install --save-dev gulp-uglify
8. gulp build -> gulp watch-scripts
9. (for Windows deployment) copy static/libs/tinymce-i18n/langs to static/libs/tinymce/langs

## Server Deployment (some tips)

1. Copy book_site/configuration_settings.py.(debug/release) as book_site/configuration_settings.py
2. Copy book_site/private_settings.py.sample as book_site/private_settings.py and fill it with your info