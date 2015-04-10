@echo off
set phppath=error
if exist "C:\xampp" set phppath=C:\xampp\php
if exist "D:\xampp" set phppath=D:\xampp\php
if exist "C:\PHP5" set phppath=C:\PHP5

if "%phppath%"=="error" goto error

set "PATH=%PATH%;%phppath%"

php -f index.php > index.html

goto end
:error

echo XAMPP or PHP installation not found.
echo http://php.net/manual/en/install.windows.commandline.php
pause

:end