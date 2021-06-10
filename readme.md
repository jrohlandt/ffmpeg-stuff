Good source of examples http://www.astro-electronic.de/FFmpeg_Book.pdf

Intro to digital video: https://github.com/leandromoreira/digital_video_introduction
Intro to FFmpeg commands and underlying libav libraries: https://github.com/leandromoreira/ffmpeg-libav-tutorial

For more detail: http://ffmpeg.org/ffmpeg.html 
FFmpeg guides: http://trac.ffmpeg.org/wiki

More detailed FFmpeg libav?s course: http://slhck.info/ffmpeg-encoding-course/#/

For image processing : ImageMagick https://imagemagick.org/index.php. 
I'm not sure but I think FFmpeg can do much (or some) of what ImageMagick does so if the project already used FFmpeg then definitely research what FFmpeg is capable of.

Similar to FFmpeg?: MLT Multimedial Framework https://www.mltframework.org/

FFmpeg programming examples: http://leixiaohua1020.github.io/#ffmpeg-development-examples

FFmpeg videos on Youtube: https://www.youtube.com/playlist?list=PLx2wYWovVzddH_yWtk87uQJI0HLLFc31N

# FFmpeg and General Notes:
Most of the notes below where made from  https://github.com/leandromoreira/ffmpeg-libav-tutorial and http://slhck.info/ffmpeg-encoding-course/#/
### Codec:
Compresses or decompresses digital video and audio.

### Container (e.g. avi, webm, mp4):
Contains all the audio and video streams and other data like general metadata.
The container describes how the above data and metadata coexist in a computer file.

### Transcoding:
Converting an audio or video stream from one codec to another.
```
$ ffmpeg -i video.mp4 -c:v libx265 video_h265.mp4
```

### Transmuxing:
Converting from one format (container) to another. E.g. mp4 to webm
```
$ ffmpeg -i video.mp4 -c copy video.webm
```

### Transrating:
Changing the bit rate of a audio or video stream.

### Transsizing:
Converting the resolution of a video file.
```
$ ffmpeg -i video.mp4 -vf scale=480:-1 video_480p.mp4
```

### List supported formats (containers):
```
$ ffmpeg -formats

File formats:
 D. = Demuxing supported
 .E = Muxing supported
 --
 D  3dostr          3DO STR
  E 3g2             3GP2 (3GPP2 file format)
  E 3gp             3GP (3GPP file format)
 D  4xm             4X Technologies
```

### List supported codecs:
```
$ ffmpeg -codecs

Codecs:
 D..... = Decoding supported
 .E.... = Encoding supported
 ..V... = Video codec
 ..A... = Audio codec
 ..S... = Subtitle codec
 ...I.. = Intra frame-only codec
 ....L. = Lossy compression
 .....S = Lossless compression
 -------
 D.VI.S 012v                 Uncompressed 4:2:2 10-bit
 D.V.L. 4xm                  4X Movie
 D.VI.S 8bps                 QuickTime 8BPS video
```

### MOST IMPORTANT (LOSSY) CODECS
Currently mostly used, standardized by ITU/ISO:

- 🎥 H.262 / MPEG-2 Part H: Broadcasting, TV, used for backwards compatibility
- 🎥 H.264 / MPEG-4 Part 10: The de-facto standard for video encoding today
- 🎥 H.265 / HEVC / MPEG-H: Successor of H.264, up to 50% better quality
- 🔊 MP3 / MPEG-2 Audio Layer III: Used to be the de-facto audio coding standard
- 🔊 AAC / ISO/IEC 14496-3:2009: Advanced Audio Coding standard

Competitors that are royalty-free:

- 🎥 VP8: Free, open-source codec from Google (not so much in use anymore)
- 🎥 VP9: Successor to VP8, almost as good as H.265
- 🎥 AV1: A successor to VP9, claims to be better than H.265

Source: http://slhck.info/ffmpeg-encoding-course/#/15

### MOST IMPORTANT LOSSLESS CODECS
See http://slhck.info/ffmpeg-encoding-course/#/16

### List supported Encoders:
```
$ ffmpeg -encoders

Encoders:
 V..... = Video
 A..... = Audio
 S..... = Subtitle
 .F.... = Frame-level multithreading
 ..S... = Slice-level multithreading
 ...X.. = Codec is experimental
 ....B. = Supports draw_horiz_band
 .....D = Supports direct rendering method 1
 ------
V.S... mpeg4                MPEG-4 part 2
```

### List full help file:
```
$ ffmpeg -h full (it's very long)
```

### Seeking and Cutting
Extract part of a video starting at a timestamp and ending after elapsed time.
```
$ ffmpeg -ss <start> -i <input> -t <duration> -c copy <output>
$ ffmpeg -ss 00:02:59 -i video.mp4 -t 61 -c copy clip.mp4
```
Extract part of a video starting at seconds that ends at specified time/seconds:
```
$ ffmpeg -ss <start> -i <input> -to <end> -c copy <output>
$ ffmpeg --s 3.5 -i video.mp4 -to 20 -c copy clip.mp4
```

***NOTES ABOUT SEEKING:***
- When re-encoding video, seeking is always accurate to the timestamp
- When copying bitstreams (-c copy), ffmpeg may copy frames that are not shown but necessary to include
- Cutting with -c copy may yield video that starts with black frames (on unsupported players)

Also see:
http://trac.ffmpeg.org/wiki/Seeking
https://superuser.com/questions/138331/using-ffmpeg-to-cut-up-video

Source: http://slhck.info/ffmpeg-encoding-course/#/25

### SETTING QUALITY
- The output quality depends on encoder defaults and the source material
- Do not just encode without setting any quality level!
- Generally: You need to choose a target bitrate or quality level
- Target bitrate depends on the video genre, size and framerate

```
-b:v or -b:a to set bitrate
e.g., -b:v 1000K = 1000 kbit/s, -b:v 8M = 8 Mbit/s
-q:v or -q:a to set fixed-quality parameter
e.g., -q:a 2 for native AAC encoder
```
***List encoder-specific options***
```
$ ffmpeg -h encoder=libx264
```

There is a lot more to quality, speed and bit rates. Read http://slhck.info/ffmpeg-encoding-course/#/26
and https://trac.ffmpeg.org/wiki/Encode/H.264
### Stream Mapping:

Each stream has an index/id:
- 0:0 is the first stream of the first input file
- 0:1 is the second stream in the first input file
- 0:v:0 is the first video stream in the first input file
- 1:a:0 is the first audio stream in the second input file

Streams can be mapped to output.
E.g. To merge video and audio into one file:
```
$ ffmpeg -i video.mp4 -i audio.mp3 -c copy -map 0:v:0 -map 1:a:0 videowithaudio.mp4
```

### Filtering:

Scaling:

Scale to 320x240:
```
$ ffmpeg -i video.mp4 -vf "scale=w=320:h=240" out.mp4
```

Scale to a height of 240 and keep the aspect ratio divisible by 2:
```
$ ffmpeg -i video.mp4 -vf scale=w=-2:h=240 out.mp4
```

Not sure what devisible by 2 means but according to http://trac.ffmpeg.org/wiki/Scaling it is used 
to keep the aspect ratio the same.
They say to use -1.

See http://trac.ffmpeg.org/wiki/Scaling for more info on keeping aspect ratio.

TODO Jeandre continue here http://slhck.info/ffmpeg-encoding-course/#/37


