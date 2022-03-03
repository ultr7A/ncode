import { ObjectType } from "wrapt.co_re/src/Domain [╍🌐╍🧭╍]/object/object-type.enum";
import { FunctionObject } from "wrapt.co_re/src/Model [╍⬡╍ꙮ╍▦╍]/object/0_1_object-structure";
import { BooleanObject, BuiltinFunctionObject, Hash, StringObject } from "wrapt.co_re/src/Model [╍⬡╍ꙮ╍▦╍]/object/1_0_object";
import { NULL } from "wrapt.co_re/src/Model [╍⬡╍ꙮ╍▦╍]/object/1_1_object.singleton";
import { newError } from "wrapt.co_re/src/Model [╍⬡╍ꙮ╍▦╍]/util/3_0_object-util";
import { makeBuiltinClass } from "wrapt.co_re/src/Model [╍⬡╍ꙮ╍▦╍]/util/3_builtin_util";
import { Modifier } from "../../01_1_ELEMENT/1_token_💧/2_1_token";
import { applyFunction } from "../../10_0_SYSTEM/2_compiler/1_3_jit/2_0_evaluator/2_0_evaluator";
import { readWholeFile } from "../../3_Operation_☀/3_util_(🔥)/4_0_io-util";
import { writeLineToFile } from "../../3_Operation_☀/3_util_(🔥)/4_1_node-io-util";
import { nodeObjects } from "../4_io/1_file-system/2_compatibility";



type  FileObject = Hash & { Elements: { resource: StringObject } };


const fileConstructor = new BuiltinFunctionObject(
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

    fileOpen = new BuiltinFunctionObject(
        "open",  [     ], 
        function (scope) 
        {
            return new BooleanObject(false);
        }, 
        null, null, true
    ),

    fileReadAll = new BuiltinFunctionObject<FileObject>(
        "readAll", [             ObjectType.FUNCTION     ],
        function   (scope: Hash, callback: FunctionObject) 
        {
                
            if (!callback || callback.Type() != ObjectType.FUNCTION) {
                return newError("argument to readAll must be callback function");
            }
                
            readWholeFile(scope.Elements.resource.Inspect() + "", nodeObjects.fs).then(
                    function (data) {
                        applyFunction(callback, null, [new StringObject(data)], null);
                    }
            );
            return NULL;
        }, 
        null, null, true
    ),

    fileWriteLine = new BuiltinFunctionObject<FileObject>(
        "writeLine", [              ObjectType.STRING ], 
        function     (scope: Hash,  line: StringObject) 
        {
            writeLineToFile(scope.Elements.resource.Inspect() + "", line.Inspect(), nodeObjects.fs);
            return new BooleanObject(true);
        }, 
        null, null, true
    ),

    fileReadLine = new BuiltinFunctionObject(
        "readLine", [],
        function    (scope) 
        {
   
            return new StringObject("not implemented");
        },
        null, null, true

    ),
    fileHasNextLine = new BuiltinFunctionObject(
        "hasNextLine", [],
        function (scope) 
        {
            return new StringObject("not implemented");
        },
        null, null, true

    );

export const _File = makeBuiltinClass(
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
