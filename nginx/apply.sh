#!/bin/sh

ln -sf ./typeacid.ir /etc/nginx/sites-enabled/typeacid.ir
systemctl restart nginx
