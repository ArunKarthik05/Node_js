// console.log(arguments);
// console.log(require("module").wrapper);

//module.exports
const cal = require("./test-module-1");
const obj = new cal();

console.log(obj.add(2, 5));

//exports
const calc2 = require("./module2.js");
const { add, multiply } = require("./module2.js");
console.log(calc2.add(2, 5));

//caching
require("./test-module-3")();
