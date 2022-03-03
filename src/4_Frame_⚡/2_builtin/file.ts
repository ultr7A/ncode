import { StringObject } from "wrapt.co_re/src/Model [╍⬡╍ꙮ╍▦╍]/object/1_0_object";
import { makeBuiltinClass } from "wrapt.co_re/src/Model [╍⬡╍ꙮ╍▦╍]/util/3_builtin_util";
import { Modifier } from "../../01_1_ELEMENT/1_token_💧/2_1_token";

export const _File = makeBuiltinClass(
    "File", 
    [
        ["resource", new StringObject(""), [Modifier.PUBLIC]], 
    ],
    [
        ["File", fileConstructor,           [Modifier.PUBLIC]], 
        ["open", fileOpen,                  [Modifier.PUBLIC]], 
        ["hasNextLine", fileHasNextLine,    [Modifier.PUBLIC]], 
        ["readLine", fileReadLine,          [Modifier.PUBLIC]], 
        ["writeLine", fileWriteLine,        [Modifier.PUBLIC]], 
        ["readAll", fileReadAll,            [Modifier.PUBLIC]]
    ]
);
