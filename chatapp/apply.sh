#!/bin/sh

yarn
yarn build
chown -hR www-data: ./build/
