@echo off
cd /d %~dp0
echo Initializing sharding…
mongosh --host localhost --port 27017 --file ".\initSharding.js"
pause
