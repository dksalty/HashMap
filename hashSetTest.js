import { HashSet } from "./hashSet.js";

const test = HashSet();

test.set("apple");
test.set("banana");
test.set("carrot");
test.set("dog");
test.set("elephant");
test.set("frog");
test.set("grape");
test.set("hat");
test.set("ice cream");
test.set("jacket");
test.set("kite");
test.set("lion");
test.set("turtle");
test.set("turtle");

console.log(test.length());
console.log(test.remove("kite"));
console.log(test.has("kite"));
console.log(test.keys());
console.log(test.clear());
console.log(test.keys());
