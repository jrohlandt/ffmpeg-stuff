rem This is a comment
call _init.bat

%FFMPEGPATH% -framerate 1 -start_number 4551 -i %PATHI%/image_%%4d.jpg ^
-i %PATHA%/audiofile01.mp3 -shortest -c:v mpeg4 -q:v 2 %OUTDIR%/out.mp4

pause