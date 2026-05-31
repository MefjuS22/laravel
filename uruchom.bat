@echo off
cd /d "%~dp0"

echo ============================================
echo  Sklep Laravel - serwer deweloperski
echo  Adres:  http://127.0.0.1:8000
echo  Login:  admin@sklep.pl
echo  Haslo:  haslo123
echo ============================================
echo.
echo Uzywam PHP 8.5 (wymagane przez Laravel 13).
echo Zamknij okno aby zatrzymac serwer.
echo.

if exist "C:\tools\php85\php.exe" (
    "C:\tools\php85\php.exe" artisan serve
) else (
    php artisan serve
)

pause
