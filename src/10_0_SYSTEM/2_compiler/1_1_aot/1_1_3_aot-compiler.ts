import { Node }         from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept.js"
import { DynamicFunctionEvaluator, _BuiltinFunctionObject } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_0_1_object.js"
import { Environment } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_4_0_environment.js"
import { forceSingleLine } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/util/1_ubiquitous-util.js"
import { getSourceFile, readWholeFile } from "../../../3_Operation_☀/3_util_(🔥)/4_0_io-util.js"
import { nodeObjects } from "../../../4_Frame_⚡/4_io/1_file-system/2_compatibility.js"

import { TokenizerOne } from "../../0_tokenizer/1_2_tokenizer.implementation/2_1_1_tokenizer.one.js"
import { Parser } from "../../1_parser/1_1_parser/3_1_1_parser.js"
import { Transpiler } from "../../3_un-parser/2_token.unparser/0_abstract-un-parser/abstract-un-parser.js"
import { JSTranspiler } from "../../3_un-parser/2_token.unparser/2_un-parse_targets/1_1_javascript.js"
import { printParserErrors } from "../../4_shell/3_1-shell-util/3_1-shell-util.js"
import { localEvaluate, unparseWithConfig } from "../../4_shell/3_2-nodejs/0_1_0_nodejs.js";
import { Analyzer } from "../0_3_0_analyzer/1_3_expression-analyzer.js"
import { applyFunction, ExpressionEvaluator } from "../1_3_jit/2_0_evaluator/2_0_evaluator.js"
import { RuntimeOptimizer } from "../1_3_jit/3_1_runtime-optimizer.js"
import { ModuleLinker } from "../4_2_1_module-linker/1_1_0_module-linker.js"
import { AbstractAOTCompiler } from "./0_0_aot-compiler-structure/0_2_1_abstract-aot-compiler.js"
import { AOTBundler } from "./1_1_4_aot-bundler.js"

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
    public _unparser:    Transpiler;
    public evaluator:   ExpressionEvaluator;
    public linker:      ModuleLinker
    
    public get unparser() {
        return this._unparser;
    }

    public set unparser(unparser: Transpiler) {
        this._unparser = unparser;
    }

    constructor() {
        super();     

        this.tokenizer = new TokenizerOne();

        this.linker    = new ModuleLinker();
        this.parser    = new Parser(this.linker);
        
        this.analyzer  = new Analyzer();
        this.unparser  = new JSTranspiler();
        
        this.evaluator = new ExpressionEvaluator(this.parser);
        this.optimizer = new RuntimeOptimizer(this.unparser, applyFunction, this.evaluator);
        this.evaluator.setOptimizer(this.optimizer);

          _BuiltinFunctionObject.setRuntimeOptimizer(this.optimizer);
          
        // needed? (TODO: verify)
        DynamicFunctionEvaluator.setExpressionEvaluator(this.evaluator);

    }


    public compileFromAST(program: Node): string {
        return "TODO: implement";
    }

    public compile(targetLanguage: string, entryPointFile: string, replPlugins: Record<string, any> = {}): Promise<void> {
        const env = new Environment();
        const cwd = process.cwd();
        const bundler = new AOTBundler();

        return getSourceFile(cwd+"/"+entryPointFile, readWholeFile, nodeObjects.fs).then((data) => {
            
            this.parser.loadSourceCode(data);
            this.parser.parseProgram();
            
            if (this.parser.errors.length != 0) {
                printParserErrors(this.parser.errors);
                return;
            }
            // localEvaluate(forceSingleLine(data), targetLanguage, this.tokenizer, 
           
            const parseResult = this.parser.getParseResult();
            console.log("getSourceFile: parseResult = ", parseResult);
            
            // Link and tansform modules, to allow bundling:

            
            // Transpile module code:
            /** 
            const outputBundle = unparseWithConfig(
                program,
                this.parser,
                targetLanguage,
                replPlugins
            );
            **/


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
