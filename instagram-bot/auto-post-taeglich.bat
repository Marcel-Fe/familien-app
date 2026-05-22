@echo off
REM Taeglicher Auto-Post eines FamilienApp-Reels.
REM Wird einmal pro Tag von der Windows-Aufgabenplanung aufgerufen.
REM Einrichtung: siehe AUTO-POST-SETUP.md
cd /d "%~dp0"
node auto-post.mjs
