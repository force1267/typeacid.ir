#!/bin/bash

script='''
sudo apt update -y
sudo apt upgrade -y
sudo apt install -y build-essential nginx git
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
git clone https://github.com/force1267/typeacid.ir

npm install yarn -g
npm install pm2@latest -g

cd server
yarn
PORT=8080 pm2 run --name server "yarn start"
pm2 save

cd ..

echo init done.
'''

ssh $@ $script
bash ./deploy.sh $1