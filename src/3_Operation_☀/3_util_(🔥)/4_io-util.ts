import { Environment } from "wrapt.co_re/src/Model [╍⬡╍ꙮ╍▦╍]/object/1_4_0_environment";
import { newError } from "wrapt.co_re/src/Model [╍⬡╍ꙮ╍▦╍]/util/3_0_object-util";
import { platformSpecificCall } from "./2_platform-utils";

export function getWindow() {
    var win = 'window';
    return (eval(win) != undefined ? eval(win) : undefined);
}

export function getDocument() {
    var win = getWindow();
    return !!win ? win.document : null;
}

export function readLineFromDocument(prompt) {
    var win = getWindow();
    return win ? win.prompt(prompt) : "Error: no document to prompt user with";
}

export function printToDocument(value) {
    var doc = getDocument(), out = doc.querySelector("#ecs-output"), item = doc.createElement("div");
    item.setAttribute("class", "ecs-output-item");
    item.innerHTML = value;
    out.appendChild(item);
}


export function println(scope: Record<string, unknown>, jsScope?: Record<string, unknown>, args?: any[]): void {
    platformSpecificCall( scope, function () {
        var out = "";
        for (var l = args.length, a = 0; a < l; a++) {
            var arg = args[a];
            if (arg && (!arg.Type || arg.Type() != ObjectType.NULL)) {
                out += (arg.Inspect ? arg.Inspect() : arg);
                if (a < l - 1) {
                    out += ",";
                }
            }
        }
        console.log(out);
    }, function () {
        args.forEach(function (arg) {
            printToDocument("" + (arg.Inspect ? arg.Inspect() : arg));
        });
    }, args);
};

export function printNativeString(scope, str) {
    if (typeof Window == 'undefined') {
        console.log(str);
    } else {
        printToDocument(str);
    }
};

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

//TODO: make into platform specific call
export function getSourceFile(path: string, readWholeFile: (path: string, fs) => void, fs) {
    var resource = new Promise(function (resolve, reject) { 
         
    return resolve(null); });
    // needs to be platform specific-call
    if (path.indexOf("://") === -1) {
        return readWholeFile(path, fs);
    }
    return resource;
}

//TODO: make into platform specific call
export function evaluateSourceFile(env: Environment, embeddedInterpreter: RecursiveEvaluator, path, readWholeFile, fs) {
    return getSourceFile(path, readWholeFile, fs).then(function (data) {
        embeddedInterpreter.parseAndEvaluate(data, env, function (errors) {
            console.log(newError("source failed: " + path));
            console.log("source errors:", errors);
        });
    }).catch(function (err) {
        printNativeString(null, err + "");
    });
};

var getSourceFileNode = function () {
}

export function readFileFromLocalStorage(filename) {
    return getWindow().localStorage.getItem(filename);
}

export function writeToLocalStorage(filename, data) {
    return getWindow().localStorage.setItem(filename, data);
}

export function writeLineToLocalStorage(filename, data) {
    var storage = getWindow().localStorage;
    return storage.setItem(filename, storage.getItem(filename) + "\n" + data);
}

function readWholeFileNode(path, fs) {
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

function writeLineToFile(src, data, fs) {
    fs.appendFile(src, data, function (err) {
        if (err)
            throw err;
    });
}

export function readWholeFile(path, fs, relativeToScript = true) {
    return platformSpecificCall( null, 
        function () { return readWholeFileNode(path, fs); }, 
        function () { return readFileFromLocalStorage(path); },
        [path]
    );
};