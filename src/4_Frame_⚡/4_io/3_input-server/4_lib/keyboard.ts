

var object_1 = require("../../object/object");
var util_1 = require("../../util");
var object = require("../../object/object");
var node_objects_1 = require("../../repl/node-objects");
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
    var stdin = node_objects_1.nodeObjects.process.stdin;
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    stdin.on('data', function (key) {
        // ctrl-c ( end of text )
        if (key === '\u0003') {
            node_objects_1.nodeObjects.process.exit();
        }
        for (var h in keyEventHandlers) {
            keyEventHandlers[h](key);
        }
    });
}
exports.onKeyUp = new object.Builtin("keyUp", [object_1.ObjectType.FUNCTION, function(scope, jsScope, callback) {
    return util_1.platformSpecificCall( scope, function () {
        //addKeyEventHandler(callback)
    }, function () {
        util_1.getWindow().document.addEventListener("keyup", function (e) {
            callback(e);
        }, true);
    }, function () { return util_1.workerNativeCall( "addEventListener", ["keyUp", callback], false); });
});
exports.onKeyDown = new object.Builtin("keyDown", [object_1.ObjectType.FUNCTION, function(scope, jsScope, callback) {
    return util_1.platformSpecificCall( scope, function () {
        addKeyEventHandler(callback);
    }, function () {
        util_1.getWindow().document.addEventListener("keydown", function (e) {
            callback(e);
        }, true);
    }, function () { return util_1.workerNativeCall( "addEventListener", ["keyDown", callback]); });
});
