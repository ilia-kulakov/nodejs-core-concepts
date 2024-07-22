const { Buffer } = require('buffer');

const memoryContainer = Buffer.alloc(4);
memoryContainer[0] = 0xf4;
memoryContainer[1] = -254;
memoryContainer[2] = 0xef;
memoryContainer[3] = 0xff;

 console.log(memoryContainer);
 console.log(memoryContainer[0]);
 console.log(memoryContainer[1]);
 console.log(memoryContainer[2]);
 console.log(memoryContainer[3]);

 console.log(memoryContainer.toString("hex"));

 