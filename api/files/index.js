import Parse from 'parse/node';
import busboy from 'co-busboy';

// create file
export const newFile = function *() {
    let file,
        part;
    let parts = busboy(this);

    while (part = yield parts) {
        if (!part.length) {
            file = yield handleFileStream(part);
            this.body = file.toJSON();
        }
    }
};

/**
 * Обёртка фаил-стрима в промис
 * @param stream
 * @returns {Promise}
 */
function handleFileStream(stream) {
    let fileBody = new Buffer([]);

    stream.on('data', (chunk) => {
        fileBody = Buffer.concat([fileBody, chunk]);
    });

    return new Promise((resolve, reject) => {
        stream.on('end', () => {
            let fileObj;
            let base64 = fileBody.toString('base64');

            fileObj = new Parse.File(stream.filename, { base64: base64 }, stream.mimeType);

            fileObj
                .save()
                .then(resolve, reject);
        });
    });
}
