

export function readStdInSync(Buffer, fs, process) {
    var BUFSIZE = 256;
    var buf = new Buffer(BUFSIZE), bytesRead;
    while (true) { // Loop as long as stdin input is available.
        bytesRead = 0;
        try {
            bytesRead = fs.readSync(process.stdin.fd, buf, 0, BUFSIZE);
        }
        catch (e) {
            if (e.code === 'EAGAIN') { // 'resource temporarily unavailable'
                // Happens on OS X 10.8.3 (not Windows 7!), if there's no
                // stdin input - typically when invoking a script without any
                // input (for interactive stdin input).
                // If you were to just continue, you'd create a tight loop.
                throw 'ERROR: interactive stdin input not supported.';
            }
            else if (e.code === 'EOF') {
                // Happens on Windows 7, but not OS X 10.8.3:
                // simply signals the end of *piped* stdin input.
                break;
            }
            throw e; // unexpected exception
        }
        if (bytesRead === 0) {
            // No more stdin input available.
            // OS X 10.8.3: regardless of input method, this is how the end 
            //   of input is signaled.
            // Windows 7: this is how the end of input is signaled for
            //   *interactive* stdin input.
            break;
        }
        // Process the chunk read.
        return buf.toString("utf8", 0, bytesRead);
    }
}

export function readWholeFileNode(path, fs): Promise<string> {
    if (fs) {
        return new Promise(function (resolve, reject) {
            if (fs.readFile) {
                fs.readFile(path, "utf8", function (err, data) {
                    if (err)
                        reject();
                    resolve(data);
                });
            }
            else {
                resolve("not implemented");
            }
        });
    }
}

export function writeLineToFile(src, data, fs) {
    fs.appendFile(src, data, function (err) {
        if (err)
            throw err;
    });
}