const { extractAudioAndConvertToMP3 } = require('./helpers.js');
const fs = require('fs');
const path = require('path');

const excludeFiles = [];
const validExtensions = ['.avi', '.mp4', '.mkv', '.webm'];

if (!process.argv[2]) {
    console.log("\nUsage: node ./convert-videos-in-dir-to-audio-files.js C:\\me\\inDir C:\\me\\outDir \n")
}


console.log('Args: ', process.argv);
const args = process.argv.slice(2);
const inDir = args[0];
const outDir = args[1];
console.log({inDir, outDir});
if (!fs.existsSync(inDir)) {
    console.error(`ERROR: The source directory ${inDir} does not exist.\n`);
    return;
}

if (fs.existsSync(outDir)) {
    console.error(`ERROR: The desitnation directory ${outDir} alread exists and you could unintentionally overwrite your files.\n Please enter the name of a new directory to be created.\n`);
    return;
}

// return;
(async () => {
    // const inPath = path.join(vPath, 'my');

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
                try {
                    if (i > 2) continue;
                    const fileName = files[i];
                    const ext = path.extname(fileName).toLowerCase();
                    if (validExtensions.indexOf(ext) === -1) continue;
                    if (excludeFiles.indexOf(fileName) !== -1) continue;

                    console.log({fileName});
                    const filePath = path.join(inDir, files[i]);
                    await extractAudioAndConvertToMP3(filePath, outDir);
                } catch (err) {
                    console.error("Conversion Error:\n", err, "\n");
                }
            }
        });
    })
})();

