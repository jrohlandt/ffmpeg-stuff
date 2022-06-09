call _init.bat

%FFMPEGPATH% -i %PATHA%/audiofile01.mp3 -af "volume=enable='between(t,10,20)':volume=0" %OUTDIR%/somesilence.mp3


pause