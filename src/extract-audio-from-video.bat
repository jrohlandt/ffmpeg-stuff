call _init.bat
rem Extract audio from video file

%FFMPEGPATH% -i %PATHV%/ukelele.mp4 -vn %OUTDIR%/audio.mp3
