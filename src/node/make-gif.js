const path = require('path');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const {ffmpegPath, ffprobePath, vPath, outDir, iPath} = require('.\\_env.js');

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

const command = ffmpeg();

const framesPath =  "C:\\Users\\ME\\AppData\\Roaming\\easyvsl\\temp\\fu5TrlhH2t6ufHmH\\easyvsl_temp_1628073939363";
const outFileName = "k17-preview.gif";

command
    .input(path.join(framesPath, `frame (%d).jpg`))
    .on('start', (commandLine) => { console.log(`FFmpeg started with command:\n ${commandLine}\n`); })
    .on('codecData', (codecData) => { console.log({codecData}); })
    .on('progress', (progress) => { console.log({progress}); })
    .on('error', (err) => console.error(err) )
    .on('end', (stdout, stderr) => { console.log('FFmpeg end: ', {stdout, stderr}); })
    .saveToFile(path.join(outDir, outFileName));