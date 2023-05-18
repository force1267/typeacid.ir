#!/bin/sh

rm -f /etc/nginx/sites-enabled/typeacid.ir
cp ./typeacid.ir /etc/nginx/sites-enabled/
systemctl restart nginx
