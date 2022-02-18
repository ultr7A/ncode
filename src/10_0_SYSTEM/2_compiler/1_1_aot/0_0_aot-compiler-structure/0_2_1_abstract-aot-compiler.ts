import { Node }         from "wrapt.co_re/src/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";
import { ModuleLinker } from "../../4_2_1_native-module-linker/1_1_0_module-linker";

/**
 * 
 */
export abstract class AbstractAOTCompiler<NodeType extends Node, OutputType> {
    
    abstract linker: ModuleLinker;
    abstract compile(node: NodeType): OutputType;

}