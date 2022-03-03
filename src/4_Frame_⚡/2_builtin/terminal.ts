import { BuiltinFunctionObject } from "wrapt.co_re/src/Model [╍⬡╍ꙮ╍▦╍]/object/1_0_object";
import { NULL } from "wrapt.co_re/src/Model [╍⬡╍ꙮ╍▦╍]/object/1_1_object.singleton";
import { makeBuiltinClass } from "wrapt.co_re/src/Model [╍⬡╍ꙮ╍▦╍]/util/3_builtin_util";
import { Modifier } from "../../01_1_ELEMENT/1_token_💧/2_1_token";
import { platformSpecificCall } from "../../3_Operation_☀/3_util_(🔥)/2_platform-utils";
import { getDocument } from "../../3_Operation_☀/3_util_(🔥)/4_2_browser-io-util";

export const getTerminalSize = function (scope) {
    if (scope === void 0) { scope = null; }
    var stdout = process ? process.stdout : null;
    return [
        stdout != null ? stdout.columns : scope ? scope.width : -2,
        stdout != null ? stdout.rows : scope ? scope.height : -2,
    ];
};
export const getDOMTerminalSize = function () {
    var output = getDocument().querySelector("#ecs-output");
    var x = 1, y = 1;
    if (output) {
        x = Math.floor(output.clientWidth / 12);
        y = Math.floor(output.clientHeight / 26) || 28;
    }
    return [x, y];
};

var clear = new BuiltinFunctionObject("clear", [], 
    function (context, scope) {
        platformSpecificCall(scope, 
            function () { console.clear(); }, 
            function () { /* web */ 
                getDocument().querySelector("#ecs-output").innerHTML = ""; 
            }
        );
        return NULL;
    }, null, null, true),

    getDimensions = new BuiltinFunctionObject("getDimensions", [], 
    function (context, scope) {
        return platformSpecificCall(scope, 
            function () { return exports.getTerminalSize(scope); }, 
            function () { return exports.getDOMTerminalSize(); },
            []
        );
    }, null, null, true), 

    hasColorSupport = new BuiltinFunctionObject("hasColorSupport", [], 
    function (context, scope) {
        return platformSpecificCall(scope, 
            function () { return true; }, 
            function () { return false; },
            []
        );

    }, null, null, true),

    has3dSupport = new BuiltinFunctionObject("has3dSupport", [], 
    function (context, scope) {
        return platformSpecificCall(scope, 
            function () { return false; }, function () { return true; },  
            []
        );
    }, null, null, true),
    
    beep = new BuiltinFunctionObject("beep", [], 
    function (context, scope) {
        platformSpecificCall(scope, 
            function () { return console.log('\u0007'); }, 
            function () { /* web */ getDocument().querySelector("#ecs-beep").play(); }, 
            []
        );
        return NULL;
    }, null, null, true);

export const Terminal = makeBuiltinClass(   "Terminal",
    [],
    [
    ["clear", clear,                        [Modifier.PUBLIC, Modifier.STATIC]],
    ["getDimensions", getDimensions,        [Modifier.PUBLIC, Modifier.STATIC]],
    ["hasColorSupport", hasColorSupport,    [Modifier.PUBLIC, Modifier.STATIC]],
    ["has3dSupport", has3dSupport,          [Modifier.PUBLIC, Modifier.STATIC]],
    ["beep", beep,                          [Modifier.PUBLIC, Modifier.STATIC]]
]);
