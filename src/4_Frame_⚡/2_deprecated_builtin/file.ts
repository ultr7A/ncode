import { ObjectType } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/object/object-type.enum.js"
import { FunctionObject } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/0_1_object-structure.js"
import { BooleanObject, _BuiltinFunctionObject, Hash, StringObject } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_0_1_object.js"
import { NULL } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_1_object.singleton.js"
import { newError } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/util/3_0_object-util.js"
import { _makeBuiltinClass } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/util/3_builtin_util.js"
import { Modifier } from "../../01_1_ELEMENT/1_token_💧/2_1_token.js"
import { applyFunction } from "../../10_0_SYSTEM/2_compiler/1_3_jit/2_0_evaluator/2_0_evaluator.js"
import { readWholeFile } from "../../3_Operation_☀/3_util_(🔥)/4_0_io-util.js"
import { writeLineToFile } from "../../3_Operation_☀/3_util_(🔥)/4_1_node-io-util.js"
import { nodeObjects } from "../4_io/1_file-system/2_compatibility.js"



type  FileObject = Hash & { Elements: { resource: StringObject } };


const fileConstructor = new _BuiltinFunctionObject(
        "File",  [                ObjectType.STRING         ],
        function (scope: FileObject, resourceName: StringObject) 
        {
            if (resourceName) {
                    scope.Elements.resource.Value = resourceName.Value;
            }
            return new BooleanObject(true);
        },
        null, null, true
    ),

    fileOpen = new _BuiltinFunctionObject(
        "open",  [     ], 
        function (scope) 
        {
            return new BooleanObject(false);
        }, 
        null, null, true
    ),

    fileReadAll = new _BuiltinFunctionObject<FileObject>(
        "readAll", [             ObjectType.FUNCTION     ],
        function   (scope: Hash, callback: FunctionObject) 
        {
                
            if (!callback || callback.Type() != ObjectType.FUNCTION) {
                return newError("argument to readAll must be callback function");
            }
                
            readWholeFile(scope.Elements.resource.Inspect() + "", nodeObjects.fs).then(
                    function (data) {
                        // TODO: supply optimizer either statically,  (if possible),  or   reference to evaluator.
                        //      Again, It's best if the signature of BuiltinFunctionFunction can remain un-changed. 
                        applyFunction(callback, null, [new StringObject(data)], null);
                    }
            );
            return NULL;
        }, 
        null, null, true
    ),

    fileWriteLine = new _BuiltinFunctionObject<FileObject>(
        "writeLine", [              ObjectType.STRING ], 
        function     (scope: Hash,  line: StringObject) 
        {
            writeLineToFile(scope.Elements.resource.Inspect() + "", line.Inspect(), nodeObjects.fs);
            return new BooleanObject(true);
        }, 
        null, null, true
    ),

    fileReadLine = new _BuiltinFunctionObject(
        "readLine", [],
        function    (scope) 
        {
   
            return new StringObject("not implemented");
        },
        null, null, true

    ),
    fileHasNextLine = new _BuiltinFunctionObject(
        "hasNextLine", [],
        function (scope) 
        {
            return new StringObject("not implemented");
        },
        null, null, true

    );

export const _File = _makeBuiltinClass(
    "File", 
    [
        ["resource", new StringObject(""), [Modifier.PUBLIC]], 
    ],
    [
        ["File",        fileConstructor,   [Modifier.PUBLIC]], 
        ["open",        fileOpen,          [Modifier.PUBLIC]], 
        ["hasNextLine", fileHasNextLine,   [Modifier.PUBLIC]], 
        ["readLine",    fileReadLine,      [Modifier.PUBLIC]], 
        ["writeLine",   fileWriteLine,     [Modifier.PUBLIC]], 
        ["readAll",     fileReadAll,       [Modifier.PUBLIC]]
    ]
);
