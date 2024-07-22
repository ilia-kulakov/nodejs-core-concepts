const fs = require('node:fs/promises');

(async () => {
    console.time('writeMany');

    const file = await fs.open('test.txt', 'w');
    const stream = file.createWriteStream();
    console.log(stream.writableHighWaterMark);

    let i = 0;
    const writeMany = () => {
        while (i < 1000000) {
            const buff = Buffer.from(` ${i} `, 'utf-8');

            if (!stream.write(buff)) {
                break;
            }

            i++;
        }

        if (i == 1000000) {
            stream.end();
        }
    };

    writeMany();

    stream.on('drain', writeMany);
    stream.on('finish', async () => {     
        console.log('Finish');
    });
    stream.on('close', () => {
        console.log('Close');
        console.timeEnd('writeMany');
    });

    
})();
