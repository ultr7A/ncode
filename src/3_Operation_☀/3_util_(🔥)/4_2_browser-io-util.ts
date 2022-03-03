import { ObjectType } from "wrapt.co_re/src/Domain [╍🌐╍🧭╍]/object/object-type.enum";
import { Environment }  from "wrapt.co_re/src/Model [╍⬡╍ꙮ╍▦╍]/object/1_4_0_environment";
import { newError }     from "wrapt.co_re/src/Model [╍⬡╍ꙮ╍▦╍]/util/3_0_object-util";
import { RecursiveEvaluator } from "../../10_0_SYSTEM/2_compiler/1_3_jit/2_0_evaluator/2_4_recursive-evaluator";
import { platformSpecificCall } from "./2_platform-utils";
import { getSourceFile } from "./4_0_io-util";

export function getWindow() {
    var win = 'window';
    return (eval(win) != undefined ? eval(win) : undefined);
}

export function getDocument() {
    var win = getWindow();
    return !!win ? win.document : null;
}

export function readLineFromDocument(prompt: string) {
    var win = getWindow();
    return win ? win.prompt(prompt) : "Error: no document to prompt user with";
}

export function printToDocument(value) {
    var doc = getDocument(), out = doc.querySelector("#ecs-output"), item = doc.createElement("div");
    item.setAttribute("class", "ecs-output-item");
    item.innerHTML = value;
    out.appendChild(item);
}


export function printNativeString(scope, str) {
    if (eval('typeof Window') == 'undefined') {
        console.log(str);
    } else {
        printToDocument(str);
    }
};

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
    return new Promise(function (resolve, reject) {
        resolve(getWindow().localStorage.getItem(filename));
    });
}

export function writeToLocalStorage(filename, data) {
    return getWindow().localStorage.setItem(filename, data);
}

export function writeLineToLocalStorage(filename, data) {
    var storage = getWindow().localStorage;
    return storage.setItem(filename, storage.getItem(filename) + "\n" + data);
}

