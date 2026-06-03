@echo off
title Constructora Santa Lucia - Web 2
cd /d "%~dp0"

echo ============================================================
echo   CONSTRUCTORA SANTA LUCIA - WEB 2 (version creativa)
echo ============================================================
echo.

if not exist node_modules (
  echo Instalando dependencias por primera vez ^(1-2 min^)...
  call npm install
  echo.
)

echo Abriendo el navegador ...
start "" cmd /c "timeout /t 4 >nul & start http://localhost:5173"
echo.
echo  -> El sitio se abrira solo en unos segundos.
echo  -> DEJA ESTA VENTANA ABIERTA mientras uses el sitio.
echo.
call npm run dev
pause
