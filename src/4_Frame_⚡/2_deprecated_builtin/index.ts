import { ObjectType }               from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/object/object-type.enum.js"
import { Matrix }                   from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/maths/matrix/index.js"
import { Vector }                   from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/maths/vector/index.js"
import { ArrayObject, _BuiltinFunctionObject, Float, Integer, StringObject, BooleanObject, Hash  }
                                    from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_0_1_object.js";   
import { NULL }                     from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_1_object.singleton.js"
import { assertBuiltinArgs }        from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/util/3_builtin_util.js"
import { copyListElements, nativeObjToMap, newError } 
                                    from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/util/3_0_object-util.js";

import { systemColorRenderer, ImageObject, Graphics }      from "meta.gl/dist/index.js";                               /*    
▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃  */


import { printNativeString } from "../../3_Operation_☀/3_util_(🔥)/4_2_browser-io-util.js"
import { println           } from "../../3_Operation_☀/3_util_(🔥)/4_0_io-util.js"                         /*
▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃  */


import { Terminal } from "./terminal.js"
import { MATHS_   } from "./maths.js"
import { _RegExp  } from "./regexp.js"
import { _JSON    } from "./json.js"
import { EObject } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/0_1_object-structure";



export const builtins = {
    "gl": Graphics,
    // "io": io,
    "terminal": Terminal,
    "Image": ImageObject,
    "Matrix": Matrix,
    "Vector": Vector,
    "Math":   MATHS_,
    "JSON":   _JSON,
    "RegExp": _RegExp,

    "toFloat": new _BuiltinFunctionObject("toFloat", [], function (_, _2, val) {
        if (!val || val.Type() != ObjectType.INTEGER_OBJ) {
            return newError("argument to `toFloat` must be int, got %s", val ? val.Type() : "null");
        }
        return new Float((val.Value));
    }, null, null, true),
    
    "time": new _BuiltinFunctionObject("time", [], function () {
        return new Integer(Date.now());
    }, null, null, true),

    "print": new _BuiltinFunctionObject("print", [], function(scope, _, ...args:EObject[]) {
        
        println( scope, args);
        return NULL;
    }, null, null, true),

    "colorize": new _BuiltinFunctionObject("colorize", [ObjectType.ARRAY, ObjectType.STRING], function (_, _2, color, str) {
        return systemColorRenderer(color, str);
    }),

    "len": new _BuiltinFunctionObject("len", [], function (_, _2, obj) {
        var arg = obj, argType = arg.Type();
        switch (argType) {
            case ObjectType.ARRAY:
                return new Integer(arg.Elements.length);
            case ObjectType.STRING:
                return new Integer(arg.Value.length);
            default:
                return newError("argument to `len` not supported, got %s", obj.Type());
        }
    }, null, null, true),

    "push": new _BuiltinFunctionObject("push", [], function (_, _2, list, item) {
        var err = assertBuiltinArgs([list, item], 2, null, 'push', [ObjectType.ARRAY]);
        if (err) {
            return err;
        }
        list.Elements.push(item);
        return list;
    }, null, null, true),

    "pop": new _BuiltinFunctionObject("pop", [], function (_, _2, list) {
        var err = assertBuiltinArgs([list], 1, null, 'pop', [ObjectType.ARRAY]);
        if (err) {
            return err;
        }
        return list.Elements.pop();
    }, null, null, true),

    "shift": new _BuiltinFunctionObject("shift", [], function (_, _2, list) {
        var err = assertBuiltinArgs([list], 1, null, 'shift', [ObjectType.ARRAY]);
        if (err) {
            return err;
        }
        return list.Elements.shift();
    }, null, null, true),

    "splice": new _BuiltinFunctionObject("splice", [], function (_, _2) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var argErr = assertBuiltinArgs(args, 3);
        if (argErr) {
            return argErr;
        }
        if (args[0].Type() != ObjectType.ARRAY || args[1].Type() != ObjectType.INTEGER_OBJ || args[2].Type() != ObjectType.INTEGER_OBJ) {
            return newError("arguments to `splice` must be ARRAY, INTEGER, INTEGER got %s %s", args[0].Type(), args[1].Type());
        }
        var elems = args[0].Elements.splice(args[1].Inspect(), args[2].Inspect());
        return new ArrayObject(elems);
    }, null, null, true),

    "concat": new _BuiltinFunctionObject("concat", [ObjectType.ARRAY, ObjectType.ARRAY], function (_, scope = null, listOne, listTwo: ArrayObject) {
        var err = assertBuiltinArgs([listOne, listTwo], 1, null, 'concat', [ObjectType.ARRAY, ObjectType.ARRAY]);
        if (err) {
            return err;
        }
        return new ArrayObject(listOne.Elements.concat(copyListElements(listTwo)));
    }, null, null, true),

    //TODO: make join hash-map recursive, via flag,  
    //                         to allow 
    //                user-defined delimiters for 
    //                serializing un-structured data.
    "join": new _BuiltinFunctionObject("join", [], 
    function (_, _2, subject: EObject, delimiter: StringObject, keyValDelimiter: StringObject, recursive: BooleanObject) {
        var args = [subject, delimiter, keyValDelimiter, recursive];
        var argErr = assertBuiltinArgs(args, 2, 4);
        if (argErr) {
            return argErr;
        }
        var arg0Type = args[0].Type(), arg1Type = args[1].Type();
        if (arg1Type != ObjectType.STRING) {
            return newError("second argument to `join` must be STRING, got %s", args[0].Type());
        }
        var outStr = "";
        var strArray = [];
        if (arg0Type == ObjectType.HASH) {
            if (arg1Type != ObjectType.STRING || args.length < 3 || args[2].Type() != ObjectType.STRING) {
                return newError("first argument to `join(hashmap, string, string)` must be Hash, got join(%s, %s, %s) ", args[0].Type(), args[1] ? args[1].Type() : "null", args[2] ? args[2].Type() : "null");
            }
            var struct = args[0] as Hash, pairs = struct.Elements;
            for (var key in pairs) {
                strArray.push(key + args[2].Inspect() + pairs[key].Inspect());
            }
        }
        else {
            if (arg0Type != ObjectType.ARRAY) {
                return newError("first argument to `join(array, string)` must be ARRAY, got %s", args[0].Type());
            }
            var arr = args[0] as ArrayObject;
            for (var si = 0, l = arr.Elements.length; si < l; si++) {
                var element = arr.Elements[si];
                var s = "";
                s = element.Inspect() as string;
                strArray.push(s);
            }
        }
        outStr = strArray.join(delimiter.Value);
        return new StringObject(outStr);
    }, null, null, true),

    //TODO: make join hash-map recursive, via flag,  
    //                         to allow 
    //                user-defined delimiters for 
    //                serializing un-structured data.
    "split": new _BuiltinFunctionObject("split", [], 
    function (_, _2, subject: EObject, delimiter: StringObject, keyValDelimiter: StringObject, recursive: BooleanObject) {
        var args = [];
        
        var argErr = assertBuiltinArgs(args, 2, 4);
        if (argErr) {
            return argErr;
        }
        if (subject.Type() != ObjectType.STRING) {
            return newError("first argument to `split` must be STRING or HASH, got %s", subject.Type());
        }
        if (delimiter.Type() != ObjectType.STRING) {
            return newError("second argument to `split` must be STRING, got %s", delimiter.Type());
        }
        if (args.length === 3) {
            if (keyValDelimiter.Type() != ObjectType.STRING) {
                return newError("third argument to `split` must be STRING, got %s", keyValDelimiter.Type());
            }
            var pairs       = {}, 
                kvs         = keyValDelimiter.Inspect() + "", 
                ps          = delimiter.Inspect() + "", 
                parsedPairs = (subject.Inspect() + "").split(ps);

            for (var p in parsedPairs) {
                var keyValue = parsedPairs[p].split(kvs);
                pairs[keyValue[0]] = keyValue[1];
            }

            return nativeObjToMap(pairs);
        }
        else {
            var str = args[0].Value + "", elems = str.split(args[1].Value), ecsElems = [];
            for (var i = 0, l = elems.length; i < l; i++) {
                var element = elems[i];
                ecsElems.push(new StringObject(element));
            }
            return new ArrayObject(ecsElems);
        }
    }, null, null, true),

    "help": new _BuiltinFunctionObject("help", [], function (_, _2, topic: StringObject) {
                                          // TODO: \/ \/ \/
        var helpElems = [], helpStrs = []; //listAllDocs();
        
        if (topic) {
            man(topic);
            return new StringObject("");
        }
        else {
            printNativeString(null, "");
            printNativeString(null, "╔═══════════════════════════════════════════════╗");
            printNativeString(null, "║ Help Topics             💡 help(\"topicName\"); ║");
            printNativeString(null, "╚═══════════════════════════════════════════════╝");
            helpStrs.forEach(function (helpStr) {
                helpElems.push(new StringObject(helpStr));
            });
            man([new StringObject("builtins")]);
            return new ArrayObject(helpElems);
        }
    }, null, null, true)
};


function man(args) {
    if (args[0].Type() != ObjectType.STRING) {
        return newError("argument to `man` must be STRING, got %s", args[0].Type());
    }
    var helpKey = args[0].Value;       // TODO: \/ \/ \/
    var helpElems = [], helpStrs = []; //getHelp(helpKey);
    var leftBorder = helpKey != "builtins";
    printNativeString(null, "");
    printNativeString(null, "╔════════════════════════════════════════════════════════════════════════════════════════════════════════════╗");
    helpStrs.forEach(function (helpStr) {
        printNativeString(null, (leftBorder ? "║ " : "") + helpStr);
    });
    
    printNativeString(null, "╚════════════════════════════════════════════════════════════════════════════════════════════════════════════╝");
}
