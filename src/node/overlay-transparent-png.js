const path = require('path');
const fs = require('fs');
const {ffmpegPath, ffprobePath, vPath, outDir} = require('.\\_env.js');
const ffmpeg = require('fluent-ffmpeg');
const Ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);
const inputVid = "C:\\Users\\me\\Downloads\\b2ff1bb2-3cd4-41c5-a1ee-ea6b7c066011.mp4";
const watermark = "C\\:/\Users/\me/\Pictures/\easy_vacation_text.png";

// %FFMPEGPATH% -i %VIDNEW% -vf "scale=1280:720 [main]; movie=easy_vacation_text.png [watermark]; [watermark]scale=1000x200 [watermark2]; [main][watermark2] overlay=(main_w/2)-(overlay_w/2):main_h-overlay_h-10 [out]" %OUTDIR%/wwater.mp4


const outFilePath = outDir + '\\node-overlay.mp4';
const command = new Ffmpeg(inputVid);
command
.videoFilter([
    // TODO NOT WORKING !!!
    "movie=C:/\Users/\me/\Downloads/\easy_vacation_text.png [watermark]; [watermark]scale=1000x200 [watermark2]; [in][watermark2] overlay=(main_w/2)-(overlay_w/2):main_h-overlay_h-10 [out]"
])
// .complexFilter([
//     // 'scale=1280:720[rescaled]',
//     {
//         filter: "movie=C\\:/\Users/\me/\Downloads/\easy_vacation_text.png",
//         // inputs: 'rescaled',
//         outputs: 'watermark'
//     },
//     {
//         filter: "scale=1000x200",
//         inputs: 'watermark',
//         outputs: 'watermark2'
//     },
//     {
//         filter: "overlay=(main_w/2)-(overlay_w/2):main_h-overlay_h-10", 
//         inputs:[
//             // 'rescaled',
//             'watermark2'], 
//         outputs: 'output'
//     }
// ], 'output')
.saveToFile(outFilePath)
.on('start', (commandLine) => { console.log(`FFmpeg started with command:\n ${commandLine}\n`); })
.on('codecData', (codecData) => { console.log({codecData}); })
.on('progress', (progress) => { console.log({progress}); })
.on('error', (err) => { console.error(err); })
.on('end', (stdout, stderr) => {
    console.log(`FFmpeg end: File written to ${outFilePath}.`); 
});         


//ffmpeg -i C:\Users\me\Downloads\b2ff1bb2-3cd4-41c5-a1ee-ea6b7c066011.mp4 -y -vf "scale=1280:720 [main]; movie=easy_vacation_text.png [watermark]; [watermark]scale=1000x200 [watermark2]; [main][watermark2] overlay=(main_w/2)-(overlay_w/2):main_h-overlay_h-10 [out]" C:\Users\me\Code\J\ffmpeg-stuff\out\node-overlay.mp4




