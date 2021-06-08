const path = require('path');
const {vPath} = require('./_env.js');
const {getMetadata} = require('./helpers.js');

(async () => {
    const data = await getMetadata(path.join(vPath, 'videofile03.avi'));
    console.log(data.streams);
})();