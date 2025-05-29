@echo off
cd /d %~dp0
echo Starting rs1 on port 27217…
start "" mongod --dbpath "..\mongo-replica\rs1" --port 27217 --replSet rs0 --bind_ip localhost
