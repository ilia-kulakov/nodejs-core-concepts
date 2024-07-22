const fs = require('fs/promises');

(async () => {
    // commmands
    const CREATE_FILE = 'create a file';
    const DELETE_FILE = 'delete the file';
    const RENAME_FILE = 'rename the file';
    const ADD_TO_FILE = 'add to the file';

    const createFile = async (path) => {
        try {
            const existingFileHandle = await fs.open(path, 'r');
            existingFileHandle.close();
            return console.log(`The file ${path} already exists.`);
        } catch (e) {
            let newFileHandle = await fs.open(path, 'w');
            console.log('A new file was successfully created');
            newFileHandle.close();
        }
    };

    const deleteFile = async (path) => {
        console.log(`Delete the file "${path}"`);
        try {
            await fs.unlink(path);
            console.log('The file was successfully removed');
        } catch (e) {
            if (e.code === 'ENOENT') {
                console.log(`No file at this path to remove "${path}"`);
            } else {
                console.log(`Can not delete the file "${path}"`);
                console.log(e);
            }
        }
    };

    const renameFile = async (oldPath, newPath) => {
        console.log(`Rename the file "${oldPath}" to "${newPath}"`);
        try {
            await fs.rename(oldPath, newPath);
            console.log('The file was successfully renamed');
        } catch (e) {
            if (e.code === 'ENOENT') {
                console.log(`No file at this path to rename "${oldPath}"`);
            } else {
                console.log(`Can not rename the file "${oldPath}"`);
                console.log(e);
            }
        }
    };

    let addedContent;

    const addToFile = async (path, content) => {
        if (addedContent == content) {
            return;
        }

        console.log(`Add to the file "${path}" this content "${content}"`);
        try {
            // await fs.appendFile(path, content);
            const fileHandle = await fs.open(path, 'a');
            fileHandle.write(content);
            fileHandle.close();

            addedContent = content;
            console.log('The content was successfully added');
        } catch (e) {
            console.log(`Can not add content to file "${path}"`, e);
        }
    };

    const commandFileHandler = await fs.open('./command.txt', 'r');

    commandFileHandler.on('change', async () => {
        const size = (await commandFileHandler.stat()).size;
        const buff = Buffer.alloc(size);
        const offset = 0;
        const length = buff.byteLength;
        const position = 0;

        await commandFileHandler.read(buff, offset, length, position);
        const command = buff.toString('utf-8');

        if (command.startsWith(CREATE_FILE)) {
            const filePath = command.substring(CREATE_FILE.length + 1);
            createFile(filePath);
        }

        if (command.startsWith(DELETE_FILE)) {
            const filePath = command.substring(DELETE_FILE.length + 1);
            deleteFile(filePath);
        }

        // rename the file <old-path> to <new-path>
        if (command.startsWith(RENAME_FILE)) {
            const separator = ' to ';
            const separatorIndex = command.indexOf(separator);
            const oldPath = command.substring(
                RENAME_FILE.length + 1,
                separatorIndex
            );
            const newPath = command.substring(
                separatorIndex + separator.length
            );
            renameFile(oldPath, newPath);
        }

        // add to the file <path> this content: <content>
        if (command.startsWith(ADD_TO_FILE)) {
            const separator = ' content: ';
            const separatorIndex = command.indexOf(separator);
            const path = command.substring(
                RENAME_FILE.length + 1,
                separatorIndex
            );
            const content = command.substring(
                separatorIndex + separator.length
            );
            addToFile(path, content);
        }
    });

    const watcher = fs.watch('./command.txt');

    for await (const event of watcher) {
        if (event.eventType === 'change') {
            commandFileHandler.emit('change');
        }
    }
})();
