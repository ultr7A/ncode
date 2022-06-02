import { Node } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept.js"

import { Transpiler } from "./abstract-un-parser.js"

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
