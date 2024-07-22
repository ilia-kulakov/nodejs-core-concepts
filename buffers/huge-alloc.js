const { Buffer } = require('buffer');

const buf = Buffer.alloc(1e9);

setInterval(() => {
    

    for (let i = 0; i < buf.length; i++) {
        buf[i] = 0xff;
    }
}, 1000);
