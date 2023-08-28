const fs = require("fs");
const crypto = require("crypto");
const start = Date.now();
process.env.UV_THREADP0OL_SIZE = 3;

setTimeout(() => console.log("Executed set timeout"), 0);
setTimeout(
  () => console.log("Executed set timeout after 3s outside callback"),
  3000
);
setImmediate(() => console.log("Executed set immediate"));

fs.readFile("test-file.txt", () => {
  console.log("File read");

  setTimeout(() => console.log("Executed set timeout"), 0);
  setTimeout(
    () => console.log("Executed set timeout after 3s inside callback"),
    3000
  );
  setImmediate(() => console.log("Executed set immediate"));

  process.nextTick(() => console.log("Executed nexttick"));

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
});

console.log("Top level code");
