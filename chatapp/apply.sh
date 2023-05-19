#!/bin/sh

yarn
yarn build

rm -rf /var/www/html/typeacid.ir/chatapp
mkdir -p /var/www/html/typeacid.ir/chatapp
cp ./build/* /var/www/html/typeacid.ir/chatapp/

chown -hR www-data: /var/www/html/typeacid.ir
