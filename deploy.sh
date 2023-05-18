#!/bin/bash

echo "\n REMEMBER: sync your .env file to remote:~/typeacid.ir/\n"

git push

script='''
cd typeacid.ir

git stash
git pull


cd website
sh ./apply.sh
cd ..
cd chatapp
sh ./apply.sh
cd ..
cd server
sh ./apply.sh
cd ..
cd nginx
sh ./apply.sh
cd ..

echo deploy done.
'''

ssh $@ $script