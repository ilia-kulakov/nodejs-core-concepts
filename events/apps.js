const EventEmitter = require("events")

class Emitter extends EventEmitter {}

const myEmitter = new Emitter();

myEmitter.on("foo", () => {
    console.log('An event occurred 1');
});

myEmitter.on("foo", () => {
    console.log('An event occurred 2');
});

myEmitter.on("foo", (x) => {
    console.log('An event with a parameter occurred:');
    console.log(x);
});

myEmitter.emit('foo', 'Hello');
console.log("Interruption");
myEmitter.emit('foo', 'Hello');