@echo off
cd /d %~dp0
echo Initializing replica set…
mongosh --host localhost --port 27217 --file "../controllers/init_Replicas.js"
pause
