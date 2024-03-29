import OpenApiDefinition from './open_api_definition/src/index.js';
import * as fs from 'fs';
import readline from 'readline';


const xfxInstancePromise = Promise.resolve(new OpenApiDefinition.XfxApi());

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const question = (prompt) => {
    return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
            resolve(answer);
        });
    });
};

const browseFiles = async () => {
    return question(
        'Please enter the path of the root folder to browse all the files including sub-folders (SharedFolder/) or any specific sub-folder (SharedFolder/...): '
    )
        .then((path) => xfxInstancePromise.then((xfxInstance) => xfxInstance.browseFiles(path)))
        .then((response) => {
            console.log(`.browseFiles() was called successfully. The list of files: ${response}`);
            main();
        })
        .catch((ex) => {
            console.error('Exception occurred when calling .browseFiles(). ', ex);
            main();
        })
        .finally(() => {
            rl.close();
        });
};

const renameFile = async () => {
    return question('Please enter the path of the file to rename (SharedFolder/...): ')
        .then((path) => question('Please enter the new name of the file: ').then((newName) => [path, newName]))
        .then(([path, newName]) => xfxInstancePromise.then((xfxInstance) => xfxInstance.renameFile(path, newName)))
        .then((response) => {
            console.log(`.renameFile() was called successfully. The response: ${response}`);
            main();
        })
        .catch((ex) => {
            console.error('Exception occurred when calling .renameFile(). ', ex);
            main();
        })
};

const downloadFile = async (path) => {

    xfxInstancePromise.then((xfxInstance) => xfxInstance.downloadFile(path))
        .then((response) => {
            const fileName = path.split('/').pop();
            return new Promise((resolve, reject) => {
                fs.writeFile("JSConsumerFolder/" + fileName, response, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(`File saved successfully under: JSConsumerFolder/${fileName}`);
                    }
                });
            });
        })
        .then((message) => {
            console.log(message);
            main();
        })
        .catch((error) => {
            console.error(`Error downloading or saving file: ${error.message}`);
            main();
        })
};

const uploadFile = async (targetPath, localPath) => {

    xfxInstancePromise.then((xfxInstance) => {
        const file = fs.createReadStream(localPath);
        return new Promise((resolve, reject) => {

            xfxInstance.uploadFile(targetPath, { file: file })
                .then((response) => {
                    resolve(response);
                })
                .catch((ex) => {
                    reject(ex);
                });
        });
    })
        .then((response) => {
            console.log(
                `.uploadFile() was called successfully. The response: ${response}`
            );
            main();
        })
        .catch((ex) => {
            console.error("Exception occurred when calling .uploadFile(). ", ex);
            main();
        });
};

const deleteFile = async (path) => {
    xfxInstancePromise.then((xfxInstance) => xfxInstance.deleteFile(path))
        .then((response) => {
            console.log(`.deleteFile() was called successfully. The response: ${response}`);
            main();
        })
        .catch((ex) => {
            console.error('Exception occurred when calling .deleteFile(). ', ex);
            main();
        })
};


function main() {
    console.log(
        '1. Browse remote shared folder\n2. Rename remote shared file or sub-folder \n3. Download remote shared file\n4. Upload local file to remote shared folder\n5. Delete shared remote file\n6. Exit'
    );

    question('Please enter your choice: ').then((choice) => {
        const parsedChoice = parseInt(choice);

        if (parsedChoice === 1) {
            browseFiles();
        } else if (parsedChoice === 2) {
            renameFile();
        } else if (parsedChoice === 3) {
            question('Please enter the path of the file to download (SharedFolder/...): ')
                .then((path) => {
                    downloadFile(path);
                })
                .catch((error) => {
                    console.error(`Error processing user input: ${error.message}`);
                });
        } else if (parsedChoice === 4) {
            question('Please enter the path where you would like to upload to (SharedFolder/...): ')
                .then((targetPath) => {
                    question('Please enter the path of the file to upload (JSConsumerFolder/...): ')
                        .then((localPath) => {
                            uploadFile(targetPath, localPath);
                        })
                }).catch((error) => { console.error(`Error processing user input: ${error.message}`); });

        } else if (parsedChoice === 5) {
            question('Please enter the path of the file to delete (SharedFolder/...): ')
                .then((path) => {
                    deleteFile(path);
                })
                .catch((error) => {
                    console.error(`Error processing user input: ${error.message}`);
                });
        } else if (parsedChoice === 6) {
            console.log('Exiting... Thank you!');
            rl.close();
        } else {
            console.log('Invalid choice. Please try again.');
            main();
        }
    });
};

main();




