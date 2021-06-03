rem Merge Multiple Video files (they have to contain the same number of audio and other streams)

ffmpeg\ffmpeg.exe -f concat -i video-files-list.txt -c copy -y out/my.mp4


pause