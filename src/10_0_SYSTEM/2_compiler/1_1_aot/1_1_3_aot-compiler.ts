import { Node }         from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept.js"
import { UnParser }     from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/system/un-parser.js"
import { Environment } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_4_0_environment.js"
import { forceSingleLine } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/util/1_ubiquitous-util.js"
import { getSourceFile, readWholeFile } from "../../../3_Operation_☀/3_util_(🔥)/4_0_io-util.js"
import { nodeObjects } from "../../../4_Frame_⚡/4_io/1_file-system/2_compatibility.js"

import { TokenizerOne } from "../../0_tokenizer/1_2_tokenizer.implementation/2_1_1_tokenizer.one.js"
import { Parser } from "../../1_parser/1_1_parser/3_1_1_parser.js"
import { Transpiler } from "../../3_un-parser/2_token.unparser/0_abstract-un-parser/abstract-un-parser.js"
import { localEvaluate } from "../../4_shell/3_2-nodejs/0_1_0_nodejs.js";
import { Analyzer } from "../0_3_analyzer/1_3_expression-analyzer.js"
import { applyFunction, ExpressionEvaluator } from "../1_3_jit/2_0_evaluator/2_0_evaluator.js"
import { RuntimeOptimizer } from "../1_3_jit/3_1_runtime-optimizer.js"
import { ModuleLinker } from "../4_2_1_module_linker/1_1_0_module-linker.js"
import { AbstractAOTCompiler } from "./0_0_aot-compiler-structure/0_2_1_abstract-aot-compiler.js"

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
    
    
    public tokenizer:   TokenizerOne;
    public parser:      Parser;
    public optimizer:   RuntimeOptimizer;
    public analyzer:    Analyzer;
    public unparser:    Transpiler;
    public evaluator:   ExpressionEvaluator;
    public linker:      ModuleLinker
    

    constructor() {
        super();     

        this.tokenizer = new TokenizerOne();
        this.parser    = new Parser();
        this.analyzer  = new Analyzer();
        this.evaluator = new ExpressionEvaluator(this.parser);
        this.optimizer = new RuntimeOptimizer(this.unparser, applyFunction, this.evaluator);
        this.linker    = new ModuleLinker();
    }


    public compileFromAST(program: Node): string {
        return "TODO: implement";
    }

    public compile(targetLanguage: string, entryPointFile: string, replPlugins: Record<string, any> = {}): Promise<void> {
        const env = new Environment();
            
        return getSourceFile(entryPointFile, readWholeFile, nodeObjects.fs).then(function (data) {
            localEvaluate(forceSingleLine(data), targetLanguage, this.tokenizer, 
            this.parser, 
            env, 
            replPlugins, 
            this.evaluator);
        }).catch(function (err) { console.log(err); });
    }

    public compileAndRun(entryPointFile: string, replPlugins: Record<string, any> = {}): Promise<void> {
        
        return getSourceFile(entryPointFile, readWholeFile, nodeObjects.fs).then(function (data) {
            const env = new Environment();

            localEvaluate(forceSingleLine(data), "js", this.tokenizer, 
            this.parser, 
            env, 
            replPlugins, 
            this.evaluator);
        }).catch(function (err) { console.log(err); });
    }



}
