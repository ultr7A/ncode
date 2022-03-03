import { ObjectType } from "wrapt.co_re/src/Domain [╍🌐╍🧭╍]/object/object-type.enum";
import { BuiltinFunctionObject } from "wrapt.co_re/src/Model [╍⬡╍ꙮ╍▦╍]/object/1_0_object";
import { FALSE, TRUE } from "wrapt.co_re/src/Model [╍⬡╍ꙮ╍▦╍]/object/1_1_object.singleton";
import { makeBuiltinClass } from "wrapt.co_re/src/Model [╍⬡╍ꙮ╍▦╍]/util/3_builtin_util";
import { Modifier } from "../../01_1_ELEMENT/1_token_💧/2_1_token";

function RegExpState(pattern) {
    this.kernel = new RegExp(pattern);
}
export const _RegExp = makeBuiltinClass("RegExp", 
    [],
    [
        [
            "RegExp",
            new BuiltinFunctionObject(
                "RegExp",   [                           ObjectType.STRING], 
                function    (context, scope, jsScope,   pattern          ) {
                if (context === void 0) { context = null; }
                if (scope === void 0) { scope = null; }
                jsScope = new RegExpState(pattern.Value);
            }, null, null, true),
            [Modifier.PUBLIC, Modifier.STATIC]  
        ],
        [
            "test",
            new BuiltinFunctionObject("test", [ObjectType.STRING], function (context, scope, jsScope, against) {
                return scope.builtins.kernel.test(against.Value) ? TRUE : FALSE;
            }, null, null, true),
            [Modifier.PUBLIC, Modifier.STATIC]
        ]
    ]);
