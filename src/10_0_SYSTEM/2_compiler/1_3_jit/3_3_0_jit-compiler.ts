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

import { UnParser }    from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/system/un-parser.js"
import { Environment } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_4_0_environment.js"
import { TokenizerOne } from "../../0_tokenizer/1_2_tokenizer.implementation/2_1_1_tokenizer.one.js"
import { Parser } from "../../1_parser/1_1_parser/3_1_1_parser.js"
import { Transpiler } from "../../3_un-parser/2_token.unparser/0_abstract-un-parser/abstract-un-parser.js"
import { JSTranspiler } from "../../3_un-parser/2_token.unparser/2_un-parse_targets/1_1_javascript.js"
import { Analyzer } from "../0_3_analyzer/1_3_expression-analyzer.js"
import { applyFunction, ExpressionEvaluator } from "./2_0_evaluator/2_0_evaluator.js"
import { RuntimeOptimizer } from "./3_1_runtime-optimizer.js"

export class JITCompiler {
     
   
   public parser:       Parser;
   public tokenizer:    TokenizerOne;
   public optimizer:    RuntimeOptimizer;
   public analyzer:     Analyzer;
   public evaluator:    ExpressionEvaluator;
   public unparser:     Transpiler;
   public environment:  Environment;


   constructor() {

      this.tokenizer = new TokenizerOne();
      this.parser    = new Parser();
      this.analyzer  = new Analyzer();
      this.unparser  = new JSTranspiler();
      this.environment = new Environment();
      this.evaluator = new ExpressionEvaluator();
      this.optimizer = new RuntimeOptimizer(this.unparser, applyFunction, this.evaluator);

   }

}