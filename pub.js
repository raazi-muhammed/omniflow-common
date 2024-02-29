const { execSync } = require("child_process");
const argv = require("yargs").argv;

const commitMessage = argv.m || "updates";

execSync(
    `git add . && git commit -m "${commitMessage}"  && npm version patch && npm run build && npm publish && git push`,
    { stdio: "inherit" }
);
