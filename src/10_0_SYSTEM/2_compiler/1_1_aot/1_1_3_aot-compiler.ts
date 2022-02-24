import { Node }         from "wrapt.co_re/src/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";
import { UnParser }     from "wrapt.co_re/src/Domain [╍🌐╍🧭╍]/system/un-parser";

import { TokenizerOne } from "../../0_tokenizer/1_2_tokenizer.implementation/2_1_1_tokenizer.one";
import { Parser } from "../../1_parser/1_1_parser/3_1_1_parser";
import { Analyzer } from "../0_3_analyzer/1_3_expression-analyzer";
import { RuntimeOptimizer } from "../1_3_jit/3_1_runtime-optimizer";
import { ModuleLinker } from "../4_2_1_native-module-linker/1_1_0_module-linker";
import { AbstractAOTCompiler } from "./0_0_aot-compiler-structure/0_2_1_abstract-aot-compiler";

/* ******************************************************* *
 * 
 * /T\__________[=]
 * ----------------- 
 *              [Ahead-of-time compiler]
 * 
 * for          
 * creating     : :
 *              /T\         [JS bundles]
 *              
 *              and         [Web-Components]
 *              ---------------
 * from         [[Expression or Statement] Node]
 * ----------------
 * ****************************************************** */
export class AOTCompiler extends AbstractAOTCompiler<Node, string> {
    

    public parser: Parser;
    public tokenizer: TokenizerOne;
    public optimizer: RuntimeOptimizer;
    public analyzer:  Analyzer;
    public transpiler: UnParser;

    public linker: ModuleLinker
    

    public compile(program: Node): string {
        return "TODO: implement";
    }



}
