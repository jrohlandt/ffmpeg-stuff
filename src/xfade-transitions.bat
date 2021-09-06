call _init.bat
rem See https://ottverse.com/crossfade-between-videos-ffmpeg-xfade-filter/ for more examples.
%FFMPEGPATH%  -i %PATHV%/bbb_clip.mp4 -i %PATHV%/bbb_full.mp4 -filter_complex xfade=transition=slideleft:duration=5:offset=5 %OUTDIR%/slideleftVideo.mp4