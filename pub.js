// pub.js
const { execSync } = require("child_process");
const argv = require("yargs").argv;

const commitMessage = argv.m || "updates";

// Run the git commit command with the specified commit message
execSync(
    `git add . && git commit -m "${commitMessage}" && npm version patch && npm run build && npm publish`,
    { stdio: "inherit" }
);
