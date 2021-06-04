rem Merge Multiple Video files (they have to contain the same number of audio and other streams)
call _init.bat

%FFMPEGPATH% -f concat -i video-files-list.txt -c copy -y %OUTDIR%/my.mp4
