@echo off
cd /d %~dp0
echo Starting rs2 on port 27218…
start "" mongod --dbpath "..\mongo-replica\rs2" --port 27218 --replSet rs0 --bind_ip localhost
