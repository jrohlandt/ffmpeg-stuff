call _init.bat

@rem ffmpeg -r 25 -loop 1 -i images/frame_%d.jpg -y -vcodec mpeg4 -b:v 7800k -r 25 -filter:v scale=w=1280:h=720 -t 1 -t 165 out/mp4_temp_1655212623512.mp4

@rem Single pass high bitrate 
@REM %FFMPEGPATH%  -r 25 -loop 1 -i %PATHI%/frames/frame_%%d.jpg -c:v mpeg4 -b:v 7800k -r 25 -t 1 -t 45 %OUTDIR%/frames_test_single-pass.mp4


@rem two pass CBR
@rem %FFMPEGPATH%  -r 25 -loop 1 -i %PATHI%/frames/frame_%%d.jpg -y -c:v mpeg4 -b:v 5000k -r 25 -filter:v scale=w=1280:h=720 -t 1 -t 45 -pass 1 -f mp4 NUL && \
@REM %FFMPEGPATH%  -r 25 -loop 1 -i %PATHI%/frames/frame_%%d.jpg -c:v mpeg4 -b:v 5000k -maxrate 5000k -bufsize 5000k -r 25 -filter:v scale=w=1280:h=720 -t 1 -t 45 -pass 2 %OUTDIR%/frames_test_CBR.mp4


@rem two pass CVBR
%FFMPEGPATH%  -r 25 -loop 1 -i %PATHI%/frames/frame_%%d.jpg -y -c:v mpeg4 -b:v 5000k -r 25 -filter:v scale=w=1280:h=720 -t 1 -t 45 -pass 1 -f mp4 NUL && \
%FFMPEGPATH%  -r 25 -loop 1 -i %PATHI%/frames/frame_%%d.jpg -c:v mpeg4 -b:v 5000k -maxrate 7500k -bufsize 5000k -r 25 -t 1 -t 45 -pass 2 %OUTDIR%/frames_test_CVBR-150percent.mp4
