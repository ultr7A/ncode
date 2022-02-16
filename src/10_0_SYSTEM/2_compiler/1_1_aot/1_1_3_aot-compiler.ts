import { Node } from "../../../1_Structure_🌴/1_ast/0_1_0_structure-concept";
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
    
    public linker: ModuleLinker

    public compile(program: Node): string {
        return "TODO: implement";
    }



}
