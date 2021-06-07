call _init.bat

rem Extract a segment of video starting 6 seconds in and is 4 seconds in duration.
%FFMPEGPATH% -ss 6 -i %PATHV%/ukelele.mp4 -t 4 -c copy %OUTDIR%/segment.mp4