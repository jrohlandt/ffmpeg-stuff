const path = require('path');
const fs = require('fs');
const {ffmpegPath, ffprobePath, vPath} = require('.\\_env.js');
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);


async function getMetadata(filePath) {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(filePath, function(err, metadata) {
            if (err) {
                return reject(err);
            }
            resolve(metadata);
        });
    });
}

async function extractVideo(filePath, outDir) {
    return new Promise(async (resolve, reject) => {
        try {

            const fileName = path.basename(filePath);
            const outFilePath = path.join(outDir, fileName);

            const command = new ffmpeg();
            command.input(filePath)
                .outputOptions([
                    '-c copy', 
                    '-an'
                ])
                .saveToFile(outFilePath)
                .on('start', (commandLine) => { console.log(`FFmpeg started with command:\n ${commandLine}\n`); })
                .on('codecData', (codecData) => { console.log({codecData}); })
                .on('progress', (progress) => { console.log({progress}); })
                .on('error', (err) => { reject(err); })
                .on('end', (stdout, stderr) => { console.log('FFmpeg end: ', {stdout, stderr}); resolve(outFilePath) });         
                // console.log(audioStreams[0]);
        } catch(err) {
            console.error(err);
        }
    });
}

/* 
Extract Audio
ffmpeg -i input.mkv -c copy audio.m4a # AAC
ffmpeg -i input.mkv -c copy audio.mp3 # MP3
ffmpeg -i input.mkv -c copy audio.ac3 # AC3
ffmpeg -i input.mkv -an -c copy video.mkv
ffmpeg -i input.mkv -map 0:a:1 -c copy audio.m4a # stream 1
*/

async function extractAudio(filePath, outDir) {
    return new Promise(async (resolve, reject) => {
        try {

            const inputExt = path.extname(filePath);
            const fileName = path.basename(filePath, inputExt);

            const data = await getMetadata(filePath);
    
            const audioStreams = data.streams.filter((s) => s.codec_type === "audio");
            if (audioStreams.length > 1) {
                return reject({message: "Multiple audio streams detected."});
            } 
    
            let outFilePath = '';
           
            switch(audioStreams[0].codec_name) {
                case "aac":
                    outFilePath = path.join(outDir, fileName + '.m4a');
                    break;
                case "mp3":
                    outFilePath = path.join(outDir, fileName + '.mp3');
                    break;
                case 'ac3':
                    outFilePath = path.join(outDir, fileName + '.ac3');
                    break;
                case 'opus':
                    outFilePath = path.join(outDir, fileName + '.ogg');
                    break;
                default: 
                    return reject({message: `Invalid audio codec name ${audioStreams[0].codec_name}.`});
            }
    
            const command = new ffmpeg();
            command.input(filePath)
                .outputOptions([
                    '-map 0:a:0', // "?" in 0:a:0? can prevent error if audio stream does not exist also why not just use -vn ???
                    '-c copy'
                ])
                .saveToFile(outFilePath)
                .on('start', (commandLine) => { console.log(`FFmpeg started with command:\n ${commandLine}\n`); })
                .on('codecData', (codecData) => { console.log({codecData}); })
                .on('progress', (progress) => { console.log({progress}); })
                .on('error', (err) => { reject(err); })
                .on('end', (stdout, stderr) => {
                    console.log(`FFmpeg end: Audio file ${fileName} written to ${outFilePath}.`); 
                    resolve(outFilePath);
                });         
                // console.log(audioStreams[0]);
        } catch(err) {
            console.error(err);
        }
    });
}

async function extractAudioAndConvertToMP3(filePath, outDir, logPath="") {
    return new Promise(async (resolve, reject) => {
        try {

            const inputExt = path.extname(filePath);
            const fileName = path.basename(filePath, inputExt);

            const data = await getMetadata(filePath);
    
            const audioStreams = data.streams.filter((s) => s.codec_type === "audio");
            if (audioStreams.length > 1) {
                return reject({message: "Multiple audio streams detected."});
            } 
    
            let outFilePath = path.join(outDir, fileName + '.mp3');
    
            const command = new ffmpeg();
            command.input(filePath)
                .outputOptions([
                    '-vn',
                    '-c:a libmp3lame'
                ])
                .saveToFile(outFilePath)
                .on('start', (commandLine) => { console.log(`FFmpeg started with command:\n ${commandLine}\n`); })
                // .on('codecData', (codecData) => { console.log({codecData}); })
                .on('progress', (progress) => { console.log({progress}); })
                .on('error', (err) => {
                    if (logPath) {
                        fs.appendFile(logPath, `${Date()}: ERROR: ${fileName} - ${err.message}.\n`, (err) => { if (err) console.log(err); });
                    }
                    reject(err); })
                .on('end', (stdout, stderr) => { 
                    console.log(`FFmpeg end: Audio file ${fileName} written to ${outFilePath}.`); 
                    if (logPath) {
                        fs.appendFile(logPath, `${Date()}: File converted ${fileName}\n`, (err) => { if (err) console.log(err); });
                    }
                    resolve(outFilePath);
                });         
        } catch(err) {
            console.error(err);
        }
    });
}


module.exports = { getMetadata, extractVideo, extractAudio, extractAudioAndConvertToMP3 };





