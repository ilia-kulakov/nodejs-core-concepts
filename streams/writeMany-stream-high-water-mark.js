const fs = require('node:fs/promises');

(async () => {
    console.time('writeMany');

    const file = await fs.open('test.txt', 'w');
    const stream = file.createWriteStream();
    console.log(stream.writableHighWaterMark);
    const buff = Buffer.alloc(16383, 0xff);

    console.log(`buff length ${buff.length}`);
    console.log(buff);
    console.log(stream.write(buff));    
    console.log(stream.write(Buffer.alloc(1, 0x0a)));
    console.log(stream.write(Buffer.alloc(1, 0x0a)));
    console.log(stream.write(Buffer.alloc(1, 0x0a)));
    console.log(stream.write(Buffer.alloc(1, 0x0a)));
    console.log(stream.write(Buffer.alloc(1, 0x0a)));
    console.log(stream.writableLength);

    stream.on('drain', () => {
        console.log('drain');
        console.log(stream.writableLength);

    })

    file.close();

    console.timeEnd('writeMany');
})();
