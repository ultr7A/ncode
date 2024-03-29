import { ObjectType } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/object/object-type.enum.js"
import { _BuiltinFunctionObject, Hash } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_0_1_object.js"
import { platformSpecificCall } from "../../../../3_Operation_☀/3_util_(🔥)/2_platform-utils.js"
import { getWindow } from "../../../../3_Operation_☀/3_util_(🔥)/4_2_browser-io-util.js"
import { nodeObjects } from "../../1_file-system/2_compatibility.js"


/*************************************************
 *  Human Input Devices
 *************************************************/
var keyEventHandlers = [];
var keyEventHandler = false;
function addKeyEventHandler(callback) {
    keyEventHandlers.push(callback);
    if (!keyEventHandler) {
        keyEventHandler = true;
        setUpKeyEventHandler();
    }
}
function setUpKeyEventHandler() {
    var stdin = nodeObjects.process.stdin;
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    stdin.on('data', function (key) {
        // ctrl-c ( end of text )
        if (key === '\u0003') {
            nodeObjects.process.exit();
        }
        for (var h in keyEventHandlers) {
            keyEventHandlers[h](key);
        }
    });
}

export const onKeyUp = new _BuiltinFunctionObject(
    "keyUp", [                ObjectType.FUNCTION], 
    function (scope, callback           ) 
    {
        return platformSpecificCall( scope, function () {
            //addKeyEventHandler(callback)
        },  function () {
                getWindow().document.addEventListener("keyup", function (e) {
                    callback(e);
                }, true);
            } //, function () { return workerNativeCall( "addEventListener", ["keyUp", callback], false); }
        );
    }
);

export const onKeyDown = new _BuiltinFunctionObject<Hash>("keyDown", [ObjectType.FUNCTION], function(scope, jsScope, callback) {
    return platformSpecificCall( scope, function () {
        addKeyEventHandler(callback);
    }, function () {
        getWindow().document.addEventListener("keydown", function (e) {
            callback(e);
        }, true);
    } //, function () { return workerNativeCall( "addEventListener", ["keyDown", callback]); }
    );
});
