const { Buffer } = require('buffer')

const memory = Buffer.alloc(3);
memory[0] = 0x48;
memory[1] = 0x69;
memory[2] = 0x21;

console.log(memory.toString('utf-8'));

//const buff = Buffer.from([0x48, 0x69, 0x21]);
const buff = Buffer.from("486921", "hex");
console.log(buff.toString('utf-8'));
console.log(buff);
