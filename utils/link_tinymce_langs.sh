#!/usr/bin/env bash
if [ ! -e static/libs/tinymce/langs ]
then
    cd static/libs/tinymce && ln -s ../tinymce-i18n/langs langs
fi