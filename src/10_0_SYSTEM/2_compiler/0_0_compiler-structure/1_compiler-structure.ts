import { NodeName } from "../../../1_Structure_🌴/1_ast/0_1_2_2_structure-implementation-enumeration";
import { Modular } from "../../0_0_system-structure/1_0_system-structure";

/* *****************************
 * 
 *                                                                           */
export interface ModularCompiler extends Modular<AbstractCompiler, NodeName>  {
    modules: {
        [key in NodeName]: AbstractEvaluator
    }
}

export interface ModularEvaluator extends Modular<AbstractEvaluator, NodeName> {

} 