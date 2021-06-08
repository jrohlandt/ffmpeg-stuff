call _init.bat

rem Split video and audio into separate files.
rem https://trac.ffmpeg.org/wiki/Map

@REM %FFMPEGPATH% -i %PATHV%/ukelele.mp4 -an -c copy %OUTDIR%/vonly.mp4

@REM %FFMPEGPATH% -i %PATHV%/ukelele.mp4 -map 0:a:0? -c copy %OUTDIR%/aonly.m4a

%FFMPEGPATH% -i %PATHV%/ukelele.mp4 -vn -c:a libmp3lame %OUTDIR%/aonly.mp3

