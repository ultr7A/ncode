import { ObjectType } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/object/object-type.enum.js"
import { _BuiltinFunctionObject, StringObject } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_0_1_object.js"
import { _makeBuiltinClass } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/util/3_builtin_util.js"
import { Modifier } from "../../01_1_ELEMENT/1_token_💧/2_1_token.js"
import { platformSpecificCall } from "../../3_Operation_☀/3_util_(🔥)/2_platform-utils.js"
import { readStdInSync } from "../../3_Operation_☀/3_util_(🔥)/4_1_node-io-util.js"
import { readLineFromDocument } from "../../3_Operation_☀/3_util_(🔥)/4_2_browser-io-util.js"
import { nodeObjects } from "../4_io/1_file-system/2_compatibility.js"
import { _File } from "./file.js"




var readLn = new _BuiltinFunctionObject(

   "readLine", [                ObjectType.STRING              ], 
    function   (context, scope, browserPromptText: StringObject) 
    {
        var args = [];
        
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }

        return platformSpecificCall(scope, 
            function () {
                return new String( readStdInSync(nodeObjects.Buffer, nodeObjects.fs, nodeObjects.process));
            }, 
            function () {
                return readLineFromDocument(browserPromptText.Value);
            },
            []
        );
    },

    null, null, false
);




export const io = _makeBuiltinClass(
    "File",
    [
        ["File", _File, [Modifier.PUBLIC]]
    ],
    [
         
        // ["HTTP", HTTP], 
        // ["Socket", Socket], 
        ["readLine", readLn, [Modifier.PUBLIC]]
    ]
);
