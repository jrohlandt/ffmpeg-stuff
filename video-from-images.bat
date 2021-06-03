rem This is a comment

ffmpeg\ffmpeg.exe -framerate 1 -start_number 4551 -i images/image_%%4d.jpg ^
-i audio/audiofile01.mp3 -shortest -c:v mpeg4 -q:v 2 out/out.mp4

pause