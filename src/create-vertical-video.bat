rem Create a vertical video for testing puroposes
call _init.bat

%FFMPEGPATH% -i %PATHV%/ukelele.mp4 -vf "scale=450:720:force_original_aspect_ratio=increase,crop=450:720" %OUTDIR%/cropped.mp4