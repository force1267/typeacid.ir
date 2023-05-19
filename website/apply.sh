#!/bin/sh

rm -rf /var/www/html/typeacid.ir/website
mkdir -p /var/www/html/typeacid.ir/website
cp ./* /var/www/html/typeacid.ir/website/

chown -hR www-data: /var/www/html/typeacid.ir
