@echo off
title Membuka Undangan Website Habib & Adiba...
cd /d "%~dp0"
echo ========================================================
echo    Membuka Undangan Website Habib & Adiba
echo    Server Lokal: http://localhost:3033/index.html
echo ========================================================
echo.
echo Menjalankan web server lokal agar video YouTube & audio
echo dapat berjalan 100%% tanpa blokir keamanan browser...
echo.
node server.js
pause
