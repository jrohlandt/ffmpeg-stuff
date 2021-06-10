const { extractAudioAndConvertToMP3 } = require('./helpers.js');
const fs = require('fs');
const path = require('path');
const { vPath, outDir: outFolder } = require('./_env.js');

const excludeFiles = [];
const validExtensions = ['.avi', '.mp4', '.mkv', '.webm'];

let inDir = '';
let outDir = '';

if (true) {
    if (!process.argv[2]) {
        console.log("\nUsage: node ./convert-videos-in-dir-to-audio-files.js C:\\me\\inDir C:\\me\\outDir \n")
    }
    
    console.log('Args: ', process.argv);
    const args = process.argv.slice(2);
    inDir = args[0];
    outDir = args[1];
} else {
    inDir = path.join(vPath, 'my');
    outDir = path.join(outFolder, 'converted');
}

if (!fs.existsSync(inDir)) {
    console.error(`ERROR: The source directory ${inDir} does not exist.\n`);
    return;
}

if (fs.existsSync(outDir)) {
    console.error(`ERROR: The desitnation directory ${outDir} alread exists and you could unintentionally overwrite your files.\n Please enter the name of a new directory to be created.\n`);
    return;
}

console.log(`\nExtracting audio from video files in ${inDir} to ${outDir}\n`);

(async () => {
    const logPath = path.join(outDir, `progress.log`);

    fs.readdir(inDir, (err, files) => {
        if (err) throw err;
        console.log({files});

        if (files.length === 0) {
            console.log("No video files found.\n");
            return;
        }

        fs.mkdir(outDir, async (err) => {
            if (err) {
                console.log("New audio dir could not be created.");
            }

            for (let i=0; i < files.length; i++) {
                const fileName = files[i];
                try {
                    // if (i > 2) continue;
                    const ext = path.extname(fileName).toLowerCase();
                    if (validExtensions.indexOf(ext) === -1) continue;
                    if (excludeFiles.indexOf(fileName) !== -1) continue;

                    console.log({fileName});
                    const filePath = path.join(inDir, files[i]);
                    await extractAudioAndConvertToMP3(filePath, outDir, logPath);
                } catch (err) {
                    console.error("Conversion Error:\n", err, "\n");
                }
            }
        });
    })
})();

