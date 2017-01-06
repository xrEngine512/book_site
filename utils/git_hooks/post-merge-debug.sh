#!/usr/bin/env bash
bower install
gulp build
cp book_site/configuration_settings.py.debug book_site/configuration_settings.py
