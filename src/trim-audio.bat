call _init.bat

@REM %FFMPEGPATH% -i %PATHA%/audiofile01.mp3 -ss 00:00:00.000 -t 00:01:01.000 -acodec copy %OUTDIR%/trimmed.mp3
%FFMPEGPATH% -i %OUTDIR%/trimmed.mp3 -ss 00:00:10.000 -acodec copy %OUTDIR%/trimmed-final.mp3



pause
