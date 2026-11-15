const { randomBytes, scryptSync } = require("node:crypto");
const readline = require("node:readline");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question("Admin password (input will be visible): ", (password) => {
  if (password.length < 16) {
    console.error("Use a password of at least 16 characters.");
    rl.close();
    process.exitCode = 1;
    return;
  }
  const salt = randomBytes(16).toString("hex");
  console.log(`ADMIN_PASSWORD_HASH=scrypt:${salt}:${scryptSync(password, salt, 64).toString("hex")}`);
  rl.close();
});
