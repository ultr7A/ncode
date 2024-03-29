import { ObjectType } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/object/object-type.enum.js"
import { _BuiltinFunctionObject } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_0_1_object.js"
import { FALSE, TRUE } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_1_object.singleton.js"
import { _makeBuiltinClass } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/util/3_builtin_util.js"
import { Modifier } from "../../01_1_ELEMENT/1_token_💧/2_1_token.js"

function RegExpState(pattern) {
    this.kernel = new RegExp(pattern);
}
export const _RegExp = _makeBuiltinClass("RegExp", 
    [],
    [
        [
            "RegExp",
            new _BuiltinFunctionObject(
                "RegExp",   [                           ObjectType.STRING], 
                function    (context, scope, jsScope,   pattern          ) {
                    if (context === void 0) { context = null; }
                    if (scope === void 0) { scope = null; }
                    jsScope = new RegExpState(pattern.Value);
                }, 
            null, null, true),
            [Modifier.PUBLIC, Modifier.STATIC]  
        ],
        [
            "test",
            new _BuiltinFunctionObject(
               "test",   [                          ObjectType.STRING], 
                function (context, scope, jsScope,  against          ) {
                    return scope.builtins.kernel.test(against.Value) ? TRUE : FALSE;
                }, 
                null, null, true
            ),
            [Modifier.PUBLIC, Modifier.STATIC]
        ]
    ]);
