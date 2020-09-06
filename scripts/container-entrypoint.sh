#!/bin/bash

service mysql start
mysql < /root/init.sql

cd /var/www/html/app/
ng serve --host 0.0.0.0