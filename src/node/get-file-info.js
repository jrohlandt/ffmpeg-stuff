const path = require('path');
const { outDir }  = require('./_env.js');

const { getMetadata } = require('./helpers.js');

(async () => {
    console.log(await getMetadata(path.join(outDir, 'cropped.mp4')));
})();

