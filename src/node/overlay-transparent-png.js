const path = require('path');
const fs = require('fs');
const {ffmpegPath, ffprobePath, vPath, outDir} = require('.\\_env.js');
const ffmpeg = require('fluent-ffmpeg');
const Ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);
const inputVid = "C:\\Users\\me\\Downloads\\b2ff1bb2-3cd4-41c5-a1ee-ea6b7c066011.mp4";
const watermark = "C:\\Users\\me\\Pictures\\easy_vacation_text.png";

const escFilePath = (filePath) => {

    // IN
    // C:\\Users\\me\\Pictures\\easy_vacation_text.png
    // OUT
    // C\\\\:/\\Users/\\me/\\Pictures/\\easy_vacation_text.png

    // See https://ffmpeg.org/ffmpeg-filters.html#Notes-on-filtergraph-escaping
    // and https://ffmpeg.org/ffmpeg-utils.html#toc-Quoting-and-escaping
    // https://stackoverflow.com/questions/60440793/how-can-i-use-windows-absolute-paths-with-the-movie-filter-on-ffmpeg
    const nStr = filePath.replace(/\\/g, '/\\');
    return nStr.replace(':', '\\\\:');
};


const outFilePath = outDir + '\\node-overlay.mp4';
const command = new Ffmpeg(inputVid);
command
    .videoFilter([
        'scale=1920:1080 [main]',
        `movie=${escFilePath(watermark)} [watermark]; [watermark] scale=1000x200 [watermark2]; [main][watermark2] overlay=(main_w/2)-(overlay_w/2):main_h-overlay_h-10 [out]`
    ])
    .videoBitrate(7800)
    .saveToFile(outFilePath)
    .on('start', (commandLine) => { console.log(`FFmpeg started with command:\n ${commandLine}\n`); })
    .on('codecData', (codecData) => { console.log({codecData}); })
    .on('progress', (progress) => { console.log({progress}); })
    .on('error', (err) => { console.error(err); })
    .on('end', (stdout, stderr) => {
        console.log(`FFmpeg end: File written to ${outFilePath}.`); 
    });         


//ffmpeg -i C:\Users\me\Downloads\b2ff1bb2-3cd4-41c5-a1ee-ea6b7c066011.mp4 -y -vf "scale=1280:720 [main]; movie=easy_vacation_text.png [watermark]; [watermark]scale=1000x200 [watermark2]; [main][watermark2] overlay=(main_w/2)-(overlay_w/2):main_h-overlay_h-10 [out]" C:\Users\me\Code\J\ffmpeg-stuff\out\node-overlay.mp4




