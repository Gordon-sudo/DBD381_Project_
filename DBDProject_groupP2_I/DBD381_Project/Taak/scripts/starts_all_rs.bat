@echo off
cd /d %~dp0
call start_rs1.bat
call start_rs2.bat
call start_rs3.bat
echo All MongoDB replica-set nodes started.
pause
