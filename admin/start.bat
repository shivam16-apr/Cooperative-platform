@echo off
title SevaPulse Admin Dashboard - Startup Script
echo ========================================================
echo       Starting SevaPulse Admin Dashboard (Vite/React)
echo ========================================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not found in PATH!
    echo Please install Node.js from https://nodejs.org/ and try again.
    pause
    exit /b 1
)

:: Check if node_modules exists, install if missing
if not exist "node_modules\" (
    echo [INFO] node_modules not found. Installing dependencies...
    call npm.cmd install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install dependencies.
        pause
        exit /b 1
    )
)

echo [INFO] Launching development server on http://localhost:3000 ...
echo [INFO] Press Ctrl + C in this window to stop the server.
echo.

call npm.cmd run dev

pause
