#!/bin/bash

echo "sync your .env file to remote:~/typeacid.ir/"

script='''
cd typeacid.ir

git stash
git pull

sh ./chatapp/apply.sh
sh ./server/apply.sh
sh ./nginx/apply.sh
'''

ssh $@ $script