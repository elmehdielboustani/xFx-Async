import OpenApiDefinition from './open_api_definition/src/index.js';
import * as fs from 'fs';


// Instantiating the XfxApi class
const xfxInstancePromise = Promise.resolve(new OpenApiDefinition.XfxApi());

const browseFiles = (path) => {

    xfxInstancePromise.then((xfxInstance) => xfxInstance.browseFiles(path))
        .then((response) => {
            console.log(`.browseFiles() was called successfully. The list of files: ${response}`);
        })
        .catch((ex) => {
            console.error('Exception occurred when calling .browseFiles(). ', ex);
        });
};

const renameFile = (path, newName) => {

    xfxInstancePromise.then((xfxInstance) => xfxInstance.renameFile(path, newName))
        .then((response) => {
            console.log(`.renameFile() was called successfully. The response: ${response}`);
        })
        .catch((ex) => {
            console.error('Exception occurred when calling .renameFile(). ', ex);
        });
};

const downloadFile = (path) => {

    xfxInstancePromise.then((xfxInstance) => xfxInstance.downloadFile(path))
        .then((response) => {
            const fileName = path.split('/').pop(); // Extracting the file name from the path
            fs.writeFile("JSConsumerFolder/" + fileName, response, (err) => {
                if (err) {
                    console.error(`Error saving file: ${err.message}`);
                } else {
                    console.log(`File saved successfully under: JSConsumerFolder/${fileName}`);
                }
            });
        })
        .catch((error) => {
            console.error(`Error downloading file: ${error.message}`);
        });
};

const uploadFile = (targetPath, localPath) => {

    xfxInstancePromise.then((xfxInstance) => {
        const file = fs.createReadStream(localPath);
        return xfxInstance.uploadFile(targetPath, { file: file });
    })
        .then((response) => {
            console.log(`.uploadFile() was called successfully. The response: ${response}`);
        })
        .catch((ex) => {
            console.error("Exception occurred when calling .uploadFile(). ", ex);
        });
};

const deleteFile = (path) => {

    xfxInstancePromise.then((xfxInstance) => xfxInstance.deleteFile(path))
        .then((response) => {
            console.log(`.deleteFile() was called successfully. The response: ${response}`);
        })
        .catch((ex) => {
            console.error('Exception occurred when calling .deleteFile(). ', ex);
        });
};


//Asynchronous calls
browseFiles('SharedFolder/');
renameFile('SharedFolder/pisa.jpg', 'newPisa.jpg');
downloadFile('SharedFolder/SubSharedFolder/paris.jpg');
uploadFile('SharedFolder/', 'JSConsumerFolder/colors.png');
deleteFile('SharedFolder/testDelete.txt');
