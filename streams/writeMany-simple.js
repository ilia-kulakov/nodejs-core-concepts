// const fs = require('node:fs/promises');
const fs = require('node:fs');

// (async () => {
//     console.time("writeMany");
//     const file = await fs.open("test.txt", "w");
//     for(let i = 0; i < 1000000;  i++) {
//         file.write(` ${i} `);
//     }
//     file.close();
//     console.timeEnd("writeMany");
// })();

(async () => {
    console.time("writeMany");
    fs.open("test.txt", "w", (err, fd) => {
        for(let i = 0; i < 1000000;  i++) {
            const buff = Buffer.from(` ${i} `, 'utf-8');
            fs.writeSync(fd, buff);
            // fs.write(fd,` ${i} `, () => {if(i === 999999)console.timeEnd("writeMany")})        
        }
        console.timeEnd("writeMany");
    });
    
})();
