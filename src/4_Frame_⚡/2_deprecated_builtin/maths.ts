/**
 * 
 */

import { ObjectType }                    from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/object/object-type.enum.js";
import { Float, _BuiltinFunctionObject } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_0_1_object.js";
import { makeBuiltinHashmap, _makeBuiltinClass }             from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/util/3_builtin_util.js";


function float(val: number) {
    return new Float(val);
}

export const MATHS_ = makeBuiltinHashmap(
    [
        ["E",       new Float(2.718281828459045),  ],
        ["LN10",    new Float(2.302585092994046),  ],
        ["LN2",     new Float(0.6931471805599453), ],
        ["LOG10E",  new Float(0.4342944819032518), ],
        ["LOG2E",   new Float(1.4426950408889634), ],
        ["PI",      new Float(3.141592653589793),  ],
        ["SQRT1_2", new Float(0.7071067811865476), ],
        [
            "fract", 
            new _BuiltinFunctionObject("fract", [ObjectType.FLOAT], (ctx, val: number) => float(val - Math.floor(val)) )
        ],
        ["abs",    new _BuiltinFunctionObject("abs",    [ObjectType.FLOAT], (ctx, param) => float(Math.abs(param))), ],
        ["acos",   new _BuiltinFunctionObject("acos",   [ObjectType.FLOAT], (ctx, param) => float(Math.acos(param))), ],
        ["acosh",  new _BuiltinFunctionObject("acosh",  [ObjectType.FLOAT], (ctx, param) => float(Math.acosh(param))), ],
        ["asin",   new _BuiltinFunctionObject("asin",   [ObjectType.FLOAT], (ctx, param) => float(Math.asin(param))), ],
        ["asinh",  new _BuiltinFunctionObject("asinh",  [ObjectType.FLOAT], (ctx, param) => float(Math.asinh(param))), ],
        ["atan",   new _BuiltinFunctionObject("atan",   [ObjectType.FLOAT], (ctx, param) => float(Math.atan(param))), ],
        ["atanh",  new _BuiltinFunctionObject("atanh",  [ObjectType.FLOAT], (ctx, param) => float(Math.atanh(param))), ],
        [
            "atan2",  
            new _BuiltinFunctionObject("atan2", [ObjectType.FLOAT, ObjectType.FLOAT], (ctx, y, x) => float(Math.atan2(y, x)))
        ],
        ["ceil",   new _BuiltinFunctionObject("ceil",   [ObjectType.FLOAT], (ctx, param) => float(Math.ceil(param))), ],
        ["cbrt",   new _BuiltinFunctionObject("cbrt",   [ObjectType.FLOAT], (ctx, param) => float(Math.cbrt(param))), ],
        ["expm1",  new _BuiltinFunctionObject("expm1",  [ObjectType.FLOAT], (ctx, param) => float(Math.expm1(param))), ],
        ["clz32",  new _BuiltinFunctionObject("clz32",  [ObjectType.FLOAT], (ctx, param) => float(Math.clz32(param))), ],
        ["cos",    new _BuiltinFunctionObject("cos",    [ObjectType.FLOAT], (ctx, param) => float(Math.cos(param))), ],
        ["cosh",   new _BuiltinFunctionObject("cosh",   [ObjectType.FLOAT], (ctx, param) => float(Math.cosh(param))), ],
        ["exp",    new _BuiltinFunctionObject("exp",    [ObjectType.FLOAT], (ctx, param) => float(Math.exp(param))), ],
        ["floor",  new _BuiltinFunctionObject("floor",  [ObjectType.FLOAT], (ctx, param) => float(Math.floor(param))), ],
        ["fround", new _BuiltinFunctionObject("fround", [ObjectType.FLOAT], (ctx, param) => float(Math.fround(param))), ],
        ["hypot",  new _BuiltinFunctionObject("hypot",  [ObjectType.FLOAT], (ctx, param) => float(Math.hypot(param))), ],
        [
            "imul",   
            new _BuiltinFunctionObject("imul", [ObjectType.FLOAT, ObjectType.FLOAT], (ctx, x, y) => float(Math.imul(x, y)))
        ],
        ["log",    new _BuiltinFunctionObject("log",    [ObjectType.FLOAT], (ctx, param) => float(Math.log(param))), ],
        ["log1p",  new _BuiltinFunctionObject("log1p",  [ObjectType.FLOAT], (ctx, param) => float(Math.log1p(param))), ],
        ["log2",   new _BuiltinFunctionObject("log2",   [ObjectType.FLOAT], (ctx, param) => float(Math.log2(param))), ],
        ["log10",  new _BuiltinFunctionObject("log10",  [ObjectType.FLOAT], (ctx, param) => float(Math.log10(param))), ],
        ["max",    new _BuiltinFunctionObject("max",    [ObjectType.FLOAT], (ctx, param) => float(Math.max(param))), ],
        ["min",    new _BuiltinFunctionObject("min",    [ObjectType.FLOAT], (ctx, param) => float(Math.min(param))), ],
        [
            "pow",    
            new _BuiltinFunctionObject("pow", [ObjectType.FLOAT, ObjectType.FLOAT], (ctx, base, power) => float(Math.pow(base, power))  )
        ],
        ["random", new _BuiltinFunctionObject("random", [ObjectType.FLOAT], (ctx, param) => float(Math.random())), ],
        ["round",  new _BuiltinFunctionObject("round",  [ObjectType.FLOAT], (ctx, param) => float(Math.round(param))), ],
        ["sign",   new _BuiltinFunctionObject("sign",   [ObjectType.FLOAT], (ctx, param) => float(Math.sign(param))), ],
        ["sin",    new _BuiltinFunctionObject("sin",    [ObjectType.FLOAT], (ctx, param) => float(Math.sin(param))), ],
        ["sinh",   new _BuiltinFunctionObject("sinh",   [ObjectType.FLOAT], (ctx, param) => float(Math.sinh(param))), ],
        ["sqrt",   new _BuiltinFunctionObject("sqrt",   [ObjectType.FLOAT], (ctx, param) => float(Math.sqrt(param))), ],
        ["tan",    new _BuiltinFunctionObject("tan",    [ObjectType.FLOAT], (ctx, param) => float(Math.tan(param))), ],
        ["tanh",   new _BuiltinFunctionObject("tanh",   [ObjectType.FLOAT], (ctx, param) => float(Math.tanh(param))), ],
        ["trunc",  new _BuiltinFunctionObject("trunc",  [ObjectType.FLOAT], (ctx, param) => float(Math.trunc(param))), ],
    ]
);



/**
 
[
  "abs",
  "acos",
  "acosh",
  "asin",
  "asinh",
  "atan",
  "atanh",
  "atan2",
  "ceil",
  "cbrt",
  "expm1",
  "clz32",
  "cos",
  "cosh",
  "exp",
  "floor",
  "fround",
  "hypot",
  "imul",
  "log",
  "log1p",
  "log2",
  "log10",
  "max",
  "min",
  "pow",
  "random",
  "round",
  "sign",
  "sin",
  "sinh",
  "sqrt",
  "tan",
  "tanh",
  "trunc"
]



    [
        "E",
        "LN10",
        "LN2",
        "LOG10E",
        "LOG2E",
        "PI",
        "SQRT1_2"
    ]

    [
        2.718281828459045, 
        2.302585092994046, 
        0.6931471805599453, 
        0.4342944819032518, 
        1.4426950408889634, 
        3.141592653589793, 
        0.7071067811865476
    ]
 */