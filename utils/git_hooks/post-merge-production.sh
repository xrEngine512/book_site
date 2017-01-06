#!/usr/bin/env bash
bower install
gulp build
cp book_site/configuration_settings.py.release book_site/configuration_settings.py
python3 manage.py collectstatic --noinput
