import { ObjectType } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/object/object-type.enum.js"
import { Hash } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_0_1_object.js"

import { platformSpecificCall } from "./2_platform-utils.js"
import { readWholeFileNode } from "./4_1_node-io-util.js"
import { printToDocument, readFileFromLocalStorage } from "./4_2_browser-io-util.js"


export function readWholeFile(path, fs, relativeToScript = true): Promise<string> {
    return platformSpecificCall<Promise<string>>( null, 
        function () { return readWholeFileNode(path, fs); }, 
        function () { return readFileFromLocalStorage(path); },
        [path]
    );
};


//TODO: make into platform specific call
export function getSourceFile(path: string, readWholeFile: (path: string, fs) => void, fs): Promise<string> {
    var resource = new Promise(function (resolve, reject) { 
         
    return resolve(null); });
    // needs to be platform specific-call
    if (path.indexOf("://") === -1) {
        return readWholeFile(path, fs) as unknown as Promise<string>;
    }
    return resource as Promise<string>;
}




export function println(scope: Hash, args?: any[]): void {
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

