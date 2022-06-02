import { Node }         from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";
import { ModuleLinker } from "../../4_2_1_module_linker/1_1_0_module-linker";

/**
 * 
 */
export abstract class AbstractAOTCompiler<NodeType extends Node, OutputType> {
    
    abstract linker: ModuleLinker;
    abstract compileFromAST(node: NodeType): OutputType;
    abstract compileAndRun(entryPointFile: string): Promise<void>;
    abstract compile(targetLanguage: string, entryPointFile: string): Promise<void>;

}