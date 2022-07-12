call _init.bat


set "VID=C:\Users\me\Videos\sample_videos\Big_Buck_Bunny_1080_10s_30MB.mp4"
set "VIDLONG=C:\Users\me\Videos\sample_videos\Big_Buck_Bunny_-_FULL_HD_60FPS.mp4"
set "VIDNEW=C:\Users\me\Downloads\b2ff1bb2-3cd4-41c5-a1ee-ea6b7c066011.mp4"
set "WATERMARK=C\\:/\Users/\me/\Downloads/\easy_vacation_text.png"


rem %FFMPEGPATH% -i %VIDLONG% -vf "movie=myimage.png [watermark]; [watermark]scale=200x100 [watermark2]; [in][watermark2] overlay=main_w-overlay_w-10:main_h-overlay_h-10 [out]" %OUTDIR%/wwater.mp4

%FFMPEGPATH% -i %VIDNEW% -vf "scale=1280:720 [main]; movie=C\\:/\Users/\me/\Downloads/\easy_vacation_text.png [watermark]; [watermark]scale=1000x200 [watermark2]; [main][watermark2] overlay=(main_w/2)-(overlay_w/2):main_h-overlay_h-10 [out]" %OUTDIR%/wwater.mp4