const { outDir, ffmpegPath, vPath, aPath } = require(".\\_env.js");
const path = require("path");
const { getMetadata, extractVideo, extractAudio } = require(".\\helpers.js");


(async () => {
    try {
        const filePath = path.join(vPath, 'videofile03.avi');
        const videoFile = await extractVideo(filePath, outDir);
        const audioFile = await extractAudio(filePath, outDir);
        console.log({videoFile});
        console.log({audioFile});
    } catch (err) {
        console.log({err});
    }
})();
