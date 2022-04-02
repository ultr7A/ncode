import { Environment }     from "wrapt.co_re/lib/Model [╍⬡╍ꙮ╍▦╍]/object/1_4_0_environment";

import { nodeObjects } from "../../../4_Frame_⚡/4_io/1_file-system/2_compatibility";
import { TokenizerOne } from "../../0_tokenizer/1_2_tokenizer.implementation/2_1_1_tokenizer.one";
import { Parser } from "../../1_parser/1_1_parser/3_1_1_parser";
import { ExpressionEvaluator } from "../../2_compiler/1_3_jit/2_0_evaluator/2_0_evaluator";
import { introMessage } from "../3_1-shell-util/3_1-shell-util";


import { localEvaluate, makeHandleInput } from "./0_1_0_nodejs";

var fs = require("fs");

export function makeCLIRepl(
    tokenizer: TokenizerOne, 
    p: Parser, 
    env: Environment, 
    replPlugins, 
    evaluator: ExpressionEvaluator
) {
    nodeObjects.fs = fs;
    nodeObjects.Buffer = Buffer;
    nodeObjects.process = process;
    

    return function (args ) {

            introMessage();
            process.stdin.resume();
            process.stdin.setEncoding('utf8');
            process.stdin.on('data', makeHandleInput(
                                        localEvaluate, 
                                        
                                        tokenizer,
                                        p,
                                        env,
                                        replPlugins,
                                        evaluator
                            )       );
    };
}
