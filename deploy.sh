#!/bin/bash

script='''
git stash
git pull
sh ./chatapp/apply.sh
sh ./server/apply.sh
sh ./nginx/apply.sh
'''

ssh $1 $script