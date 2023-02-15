const path = require('path');
const fs = require('fs');
const axios = require('axios');

const TEST_URL = 'https://www.loliapi.com/acg/pc/';
const IMAGE_FORMAT = [
    'image/gif',
    'image/png',
    'image/jpeg'
]
request(TEST_URL);
function request(url = TEST_URL) {
    axios({
        url,
        method: 'GET',
        responseType: 'arraybuffer'
    }).then((response) => {
        if (response.status === 301 || response.status === 302) {
            let location = resp.headers.location;
            request(location);
        };
        if (
            response.status === 200 &&
            IMAGE_FORMAT.includes(response.headers['content-type'])) {
                
            let filename = getFileNameByPath(response.request['path']);
            const savePath = path.join(__dirname, filename);
            fs.writeFile(savePath, response.data, (err) => {
                if (err) {
                    console.error(err);
                    return 0;
                };
                console.log('downland image success!');
            });
        }
    });
}
/**
 * 
 * @param {string} path 
 */
function getFileNameByPath(path) {
    let arr = path.split('/');
    return arr[arr.length - 1];
}
