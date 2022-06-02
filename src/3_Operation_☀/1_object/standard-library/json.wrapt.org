/**
 * 
 */

import { ObjectType } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/object/object-type.enum";
import { _BuiltinFunctionObject, StringObject } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_0_1_object";
import { objectToNativeObject, arrayToNativeList, nativeListToArray, nativeObjToMap } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/util/3_0_object-util";
import { _makeBuiltinClass } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/util/3_builtin_util";
import { Modifier } from "../../01_1_ELEMENT/1_token_💧/2_1_token";



var stringify = new _BuiltinFunctionObject(
   
   "stringify", [               [ObjectType.HASH, ObjectType.ARRAY] ], 
    function    (scope, jsScope, input: any                         )
    {
    
        let data;

        if (input == ObjectType.HASH) {
            data = objectToNativeObject(input);
        } else {
            data =    arrayToNativeList(input);
        }

        return new StringObject(JSON.stringify(data));
    }, 

    null, null, true
);


var parse = new _BuiltinFunctionObject(

   "parse",  [                ObjectType.STRING     ],           
    function (scope, jsScope, input: StringObject   ) 
    {   
        var obj = JSON.parse(input.Value);
    
        return typeof obj.length == "number" ? nativeListToArray(obj) : nativeObjToMap(obj);
    }, 

    null, null, true
);




export const _JSON = _makeBuiltinClass(   "JSON",
    [],
    [ 
        ["parse", parse,                    [Modifier.PUBLIC, Modifier.STATIC]], 
        ["stringify", stringify,            [Modifier.PUBLIC, Modifier.STATIC]]
    ]
);
