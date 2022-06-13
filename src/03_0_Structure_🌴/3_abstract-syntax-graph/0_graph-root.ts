import { Program } from "../1_ast_🧩/1_0_1_root.js"
import { AbstractBlockStatement } from "../1_ast_🧩/4_1_1_abstract-block-statement.js";
import { ASTGraphEdge } from "./4_graph-edge.js"

export interface DataFlowGraph {
    dataNodes: GraphNode[];
    dataEdges: ASTGraphEdge[];
}

export class SyntaxGraph implements DataFlowGraph {
    constructor(
        public dataNodes: GraphNode[],
        public dataEdges: ASTGraphEdge[],
        public syntax: Program,
        public treeChanges: { block: AbstractBlockStatement, id: string }[]
    ) {}
}


export interface GraphNode {
    id: string;
}

export enum ASTAddressScope {
    BLOCK = 0,
    FUNCTION = 1,
    PROGRAM = 2
}

export enum ASTPathElementType {
    Index = "Index",
    Operand = "Operand",
    Subject = "Subject",
    Consequence = "Consequence",
    Value = "Value",
    Values = "Values",
    Left = "Left",
    Right = "Right",
}

export class ASTPathElement {
    constructor(public elementType: ASTPathElementType, public index?: number) {}
}

export class ASTAddress {
    scope: ASTAddressScope;
    path: ASTPathElement[];

    constructor(path: string | ASTPathElement[], scope = ASTAddressScope.PROGRAM) {
        this.scope = scope;

        if (Array.isArray(path)) {
            this.path = path as ASTPathElement[];
        } else {
            this.path = this.tokenizeAddress(path as string);
        }
    }

    /***
     * Address may have a format similar to:
     * 
     * "0/value/left"
     */
    private tokenizeAddress(input: string): ASTPathElement[] {
        const elements = [] as ASTPathElement[];
        const strElements = input.split("/");

        for (let idx = 0; idx < strElements.length; idx ++) {
            elements.push(this.makePathElement(strElements[idx]));
        }

        return elements;
    }

    private makePathElement(input: string): ASTPathElement {
        
        if (!isNaN(input as unknown as number)) {
            return new ASTPathElement(ASTPathElementType.Index, input as unknown as number);
        }

        return new ASTPathElement(input as ASTPathElementType);
    }

}