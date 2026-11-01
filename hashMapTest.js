import { HashMap } from "./hashMap.js";

const test = HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("lion", "green");
test.set("moon", "silver");
test.set("moon", "black");

console.log(test.length());
console.log(test.keys());
console.log(test.values());
console.log(test.get("kite"));
console.log(test.remove("kite"));
console.log(test.has("kite"));
console.log(test.entries());
console.log(test.clear());
console.log(test.entries());
