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

import { DynamicFunctionEvaluator, _BuiltinFunctionObject } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_0_1_object.js"
import { Environment }                                      from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_4_0_environment.js"
import { TokenizerOne } from "../../0_tokenizer/1_2_tokenizer.implementation/2_1_1_tokenizer.one.js"
import { Parser } from "../../1_parser/1_1_parser/3_1_1_parser.js"
import { Transpiler } from "../../3_un-parser/2_token.unparser/0_abstract-un-parser/abstract-un-parser.js"
import { JSTranspiler } from "../../3_un-parser/2_token.unparser/2_un-parse_targets/1_1_javascript.js"
import { Analyzer } from "../0_3_0_analyzer/1_3_expression-analyzer.js"
import { ModuleLinker } from "../4_2_1_module-linker/1_1_0_module-linker.js"
import { applyFunction, ExpressionEvaluator } from "./2_0_evaluator/2_0_evaluator.js"
import { RuntimeOptimizer } from "./3_1_runtime-optimizer.js"

export class JITCompiler {
     
   public linker:       ModuleLinker;
   public parser:       Parser;
   public tokenizer:    TokenizerOne;
   public optimizer:    RuntimeOptimizer;
   public analyzer:     Analyzer;
   public evaluator:    ExpressionEvaluator;
   public unparser:     Transpiler;
   public environment:  Environment;


   constructor() {
      
      this.tokenizer = new TokenizerOne();

      this.linker = new ModuleLinker();
      this.parser    = new Parser(this.linker);
      this.parser.setTokenizerOne(this.tokenizer);

      this.analyzer  = new Analyzer();
      this.unparser  = new JSTranspiler();
      
      this.environment = new Environment();

      this.evaluator = new ExpressionEvaluator(this.parser);
      this.optimizer = new RuntimeOptimizer(this.unparser, applyFunction, this.evaluator);
      this.evaluator.setOptimizer(this.optimizer);
        
      _BuiltinFunctionObject.setRuntimeOptimizer(this.optimizer);
      DynamicFunctionEvaluator.setExpressionEvaluator(this.evaluator);
   }

}