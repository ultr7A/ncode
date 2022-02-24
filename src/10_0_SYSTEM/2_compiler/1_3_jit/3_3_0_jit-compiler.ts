/***
 * 
 * Wrapper class for original [convolvr/ecs] runtime:
 * 
 * [Tokenizer]
 *      |                                                 ___ Yes ----> [Transpiler] -> [RuntimeContext] ->  new Function();
 *     \/                                                / 
 * [Parser] -> [Optimizer] -> [Analyzer] -> Is Complex? ◇ 
 *                                                       \___ No -----> [Evaluator] -> [Environment]
 * 
 */

import { UnParser }    from "wrapt.co_re/src/Domain [╍🌐╍🧭╍]/system/un-parser";
import { TokenizerOne } from "../../0_tokenizer/1_2_tokenizer.implementation/2_1_1_tokenizer.one";
import { Parser } from "../../1_parser/1_1_parser/3_1_1_parser";
import { Analyzer } from "../0_3_analyzer/1_3_expression-analyzer";
import { ExpressionEvaluator } from "./2_0_evaluator/2_0_evaluator";
import { RuntimeOptimizer } from "./3_1_runtime-optimizer";

 export class JITCompiler {
     

    public parser: Parser;
    public tokenizer: TokenizerOne;
    public optimizer: RuntimeOptimizer;
    public analyzer:  Analyzer;
    public evaluator: ExpressionEvaluator;
    public transpiler: UnParser;



 }