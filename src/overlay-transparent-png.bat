call _init.bat


set "VID=C:\Users\me\Videos\sample_videos\Big_Buck_Bunny_1080_10s_30MB.mp4"
set "VIDLONG=C:\Users\me\Videos\sample_videos\Big_Buck_Bunny_-_FULL_HD_60FPS.mp4"



%FFMPEGPATH% -i %VIDLONG% -vf "movie=myimage.png [watermark]; [watermark]scale=200x100 [watermark2]; [in][watermark2] overlay=main_w-overlay_w-10:main_h-overlay_h-10 [out]" %OUTDIR%/wwater.mp4