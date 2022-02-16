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

 export class JITCompiler {
     
 }