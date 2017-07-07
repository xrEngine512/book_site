## Client Deployment
**On Linux run utils/deploy_client.sh** or manual deployment:

1. (sudo) npm install -g bower;
2. (sudo) npm install -g gulp;
3. bower install;
4. npm install;
5. gulp;
6. (for deployment on Windows) copy static/libs/tinymce-i18n/langs to static/libs/tinymce/langs

## Server Deployment (some tips)
**Dependencies:**

1. django (^1.10.5)
2. mysqlclient (^1.3.7)
3. djangorestframework (^3.4.5)
4. django-registration (^2.2)
5. django-filter (^1.0.1)
6. validate-email (^1.3)
7. py3dns (^3.1.0)

**Instructions:**

1. Copy book_site/configuration_settings.py.(debug/release) as book_site/configuration_settings.py
2. Copy book_site/private_settings.py.sample as book_site/private_settings.py and fill it with your info
