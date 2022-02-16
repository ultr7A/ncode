import { Node } from "../../../../1_Structure_🌴/1_ast/0_1_0_structure-concept";
import { NodeName } from "../../../../1_Structure_🌴/1_ast/0_1_2_2_structure-implementation-enumeration";

import { Transpiler } from "./abstract-un-parser";

export abstract class UnParserPlugin {
    
    protected transpiler: Transpiler;

    public setTranspiler(unparser: Transpiler): void {
        this.transpiler = unparser;
    }
    affectedIdentifiers: {
        [identName: string]: boolean;
    };
    resolvedIdentifiers: {
        [identName: string]: boolean;
    };
    nodeTransforms: {
        [NodeName: string]: (node: any, topScope?: boolean) => [Node, string, string];
    };   
}
