const { HttpServer } = require('http-server');
const opener = require('opener');

const host = '127.0.0.1';
const port = 8000;

function runCompilerBackend() {
    console.log("Starting CompilerBackend...");
    const { spawn } = require("child_process");
    const cmpl = spawn("python", ["-u", "compiler_backend.py", "--localOnly"], { cwd: "CompilerBackend", shell: false });
    cmpl.stdout.on("data", data => console.log(`${data.toString().trim()}`));
    cmpl.stderr.on("data", data => console.error(`${data}`));
    cmpl.on('error', (error) => console.error(`CompilerBackend error: ${error.message}`));
    cmpl.on("close", code => console.log(`CompilerBackend stopped with code ${code}`));
}

if (!process.argv.includes("--withoutCompilerBackend"))
    runCompilerBackend();

const server = new HttpServer({ cache: -1, showDotfiles: false, showDir: false });
server.listen(port, host, function () {
    console.log(`Server is listening on ${host}:${port}. Hit CTRL-C to stop the server.`);
    opener(`http://${host}:${port}/`);
});
