
import { ObjectType }               from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/object/object-type.enum";
import { Matrix }                   from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/maths/matrix";
import { Vector }                   from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/maths/vector";
import { ArrayObject, _BuiltinFunctionObject, Float, Integer, StringObject  }
                                    from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_0_1_object";   
import { NULL }                     from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_1_object.singleton";
import { assertBuiltinArgs }        from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/util/3_builtin_util";
import { copyListElements, nativeObjToMap, newError } 
                                    from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/util/3_0_object-util";

import { systemColorRenderer, ImageObject, Graphics }      from "meta.gl/dist/index.js";                               /*    
▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃  */


import { printNativeString } from "../../3_Operation_☀/3_util_(🔥)/4_2_browser-io-util";
import { println           } from "../../3_Operation_☀/3_util_(🔥)/4_0_io-util";                         /*
▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃ ▃  */


import { Terminal } from "./terminal";
import { MATHS_   } from "./maths";
import { _RegExp  } from "./regexp";
import { _JSON    } from "./json";



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

    "toFloat": new _BuiltinFunctionObject("toFloat", [], function (_, _2, _3, val) {
        if (!val || val.Type() != ObjectType.INTEGER_OBJ) {
            return newError("argument to `toFloat` must be int, got %s", val ? val.Type() : "null");
        }
        return new Float((val.Value));
    }, null, null, true),
    
    "time": new _BuiltinFunctionObject("time", [], function () {
        return new Integer(Date.now());
    }, null, null, true),

    "print": new _BuiltinFunctionObject("print", [], function(scope, _3) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        println( scope, args);
        return NULL;
    }, null, null, true),

    "colorize": new _BuiltinFunctionObject("colorize", [ObjectType.ARRAY, ObjectType.STRING], function (_, _2, _3, color, str) {
        return systemColorRenderer(color, str);
    }),

    "len": new _BuiltinFunctionObject("len", [], function (_, _2, _3, obj) {
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

    "push": new _BuiltinFunctionObject("push", [], function (_, _2, _3, list, item) {
        var err = assertBuiltinArgs([list, item], 2, null, 'push', [ObjectType.ARRAY]);
        if (err) {
            return err;
        }
        list.Elements.push(item);
        return list;
    }, null, null, true),

    "pop": new _BuiltinFunctionObject("pop", [], function (_, _2, _3, list) {
        var err = assertBuiltinArgs([list], 1, null, 'pop', [ObjectType.ARRAY]);
        if (err) {
            return err;
        }
        return list.Elements.pop();
    }, null, null, true),

    "shift": new _BuiltinFunctionObject("shift", [], function (_, _2, _3, list) {
        var err = assertBuiltinArgs([list], 1, null, 'shift', [ObjectType.ARRAY]);
        if (err) {
            return err;
        }
        return list.Elements.shift();
    }, null, null, true),

    "splice": new _BuiltinFunctionObject("splice", [], function (_, _2, _3) {
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

    "concat": new _BuiltinFunctionObject("concat", [ObjectType.ARRAY, ObjectType.ARRAY], function (_, scope = null, jsScope = null, listOne, listTwo: ArrayObject) {
        var err = assertBuiltinArgs([listOne, listTwo], 1, null, 'concat', [ObjectType.ARRAY, ObjectType.ARRAY]);
        if (err) {
            return err;
        }
        return new ArrayObject(listOne.Elements.concat(copyListElements(listTwo)));
    }, null, null, true),

    "join": new _BuiltinFunctionObject("join", [], function (_, _2, _3) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var argErr = assertBuiltinArgs(args, 2, 3);
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
            var struct = args[0], pairs = struct.Pairs;
            for (var key in pairs) {
                strArray.push(key + args[2].Inspect() + pairs[key].Value.Inspect());
            }
        }
        else {
            if (arg0Type != ObjectType.ARRAY) {
                return newError("first argument to `join(array, string)` must be ARRAY, got %s", args[0].Type());
            }
            var arr = args[0];
            for (var si = 0, l = arr.Elements.length; si < l; si++) {
                var element = arr.Elements[si];
                var s = "";
                s = element.Inspect();
                strArray.push(s);
            }
        }
        outStr = strArray.join(args[1].Value);
        return new StringObject(outStr);
    }, null, null, true),

    "split": new _BuiltinFunctionObject("split", [], function (_, _2, _3) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var argErr = assertBuiltinArgs(args, 2, 3);
        if (argErr) {
            return argErr;
        }
        if (args[0].Type() != ObjectType.STRING) {
            return newError("first argument to `split` must be STRING or HASH, got %s", args[0].Type());
        }
        if (args[1].Type() != ObjectType.STRING) {
            return newError("second argument to `split` must be STRING, got %s", args[0].Type());
        }
        if (args.length === 3) {
            if (args[2].Type() != ObjectType.STRING) {
                return newError("third argument to `split` must be STRING, got %s", args[0].Type());
            }
            var pairs = {}, kvs = args[2].Inspect() + "", ps = args[1].Inspect() + "", parsedPairs = (args[0].Inspect() + "").split(ps);
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

    "help": new _BuiltinFunctionObject("help", [], function (_, _2, _3) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }                                  // TODO: \/ \/ \/
        var helpElems = [], helpStrs = []; //listAllDocs();
        if (args.length > 1) {
            return newError("wrong number of arguments. got=%d, want=0 or 1", args.length+"");
        }
        if (args.length === 1) {
            man(args);
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
