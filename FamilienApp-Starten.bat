@echo off
REM ===========================================================
REM FamilienApp Auto-Start
REM Doppelklick auf diese Datei = App startet + URL erscheint
REM ===========================================================

cd /d "C:\Users\admin\Desktop\alleinerziehende Eltern app"

echo ============================================
echo    FAMILIENAPP STARTET...
echo ============================================
echo.

REM Alte Prozesse beenden
taskkill /F /IM python.exe /T 2>nul
taskkill /F /IM cloudflared.exe /T 2>nul
timeout /t 2 /nobreak >nul

REM Server starten (im Hintergrund)
echo [1/3] Server starten...
start /B "" python -m http.server 8000 >nul 2>&1
timeout /t 3 /nobreak >nul

REM Tunnel starten und URL extrahieren
echo [2/3] Tunnel starten (das dauert 10 Sek.)...
start /B "" cmd /c "C:\Users\admin\Desktop\cloudflared.exe tunnel --url http://localhost:8000 --no-autoupdate > C:\Users\admin\Desktop\cf-tunnel.log 2>&1"
timeout /t 14 /nobreak >nul

REM URL aus Log holen
echo [3/3] URL bereit...
echo.
echo ============================================
echo    APP IST ONLINE
echo ============================================
echo.
echo Suche URL in Logfile...
findstr /R /C:"https://[a-z-]*\.trycloudflare\.com" C:\Users\admin\Desktop\cf-tunnel.log

echo.
echo ============================================
echo  Die URL oben in den Browser kopieren
echo  oder QR-Code in der App scannen
echo ============================================
echo.
echo  Lassen Sie dieses Fenster offen!
echo  Schliessen = App offline.
echo.

REM URL automatisch in die Zwischenablage und HTML-Datei
powershell -Command "$url = (Select-String -Path 'C:\Users\admin\Desktop\cf-tunnel.log' -Pattern 'https://[\w-]+\.trycloudflare\.com' | Select-Object -First 1).Matches[0].Value; if ($url) { Set-Clipboard -Value $url; Set-Content -Path 'C:\Users\admin\Desktop\AKTUELLE-APP-URL.txt' -Value $url; $html = '<!DOCTYPE html><html><head><meta charset=utf-8><title>FamilienApp URL</title><style>body{font-family:sans-serif;text-align:center;padding:2rem;background:#f0f0f0}h1{color:#4F46E5}a{display:inline-block;background:#4F46E5;color:white;padding:1rem 2rem;border-radius:99px;text-decoration:none;font-size:1.2rem;margin:1rem}img{max-width:300px;margin:1rem auto;display:block;background:white;padding:1rem;border-radius:1rem}p{color:#666}</style></head><body><h1>FamilienApp ist online</h1><p>App-URL (kopiert in Zwischenablage):</p><a href=\"' + $url + '\" target=_blank>' + $url + '</a><h2>QR-Code fuers Handy:</h2><img src=\"https://api.qrserver.com/v1/create-qr-code/?data=' + [System.Web.HttpUtility]::UrlEncode($url) + '&size=300x300\"><p>Mit Handy-Kamera scannen oder URL eingeben</p><p style=color:#999;font-size:0.9rem>Bei naechstem Start dieser BAT-Datei wird URL automatisch aktualisiert</p></body></html>'; Set-Content -Path 'C:\Users\admin\Desktop\App-URL-Anzeigen.html' -Value $html; Start-Process 'C:\Users\admin\Desktop\App-URL-Anzeigen.html' }"

echo URL kopiert in Zwischenablage.
echo URL-Anzeige geoeffnet (App-URL-Anzeigen.html auf Desktop).
echo.

pause
