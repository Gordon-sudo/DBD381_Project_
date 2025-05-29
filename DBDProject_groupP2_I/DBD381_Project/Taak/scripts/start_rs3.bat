@echo off
cd /d %~dp0
echo Starting rs3 (arbiter) on port 27219…
start "" mongod --dbpath "..\mongo-replica\rs3" --port 27219 --replSet rs0 --bind_ip localhost
