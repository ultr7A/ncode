import { ObjectType } from "wrapt.co_re/lib/Domain [╍🌐╍🧭╍]/object/object-type.enum";
import { _BuiltinFunctionObject } from "wrapt.co_re/lib/Model [╍⬡╍ꙮ╍▦╍]/object/1_0_1_object";
import { FALSE, TRUE } from "wrapt.co_re/lib/Model [╍⬡╍ꙮ╍▦╍]/object/1_1_object.singleton";
import { makeBuiltinClass } from "wrapt.co_re/lib/Model [╍⬡╍ꙮ╍▦╍]/util/3_builtin_util";
import { Modifier } from "../../01_1_ELEMENT/1_token_💧/2_1_token";

function RegExpState(pattern) {
    this.kernel = new RegExp(pattern);
}
export const _RegExp = makeBuiltinClass("RegExp", 
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
