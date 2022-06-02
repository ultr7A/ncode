



/**
     *          Problem here:
     * 
     * Does AST support abstract nodes or do they live in the SyntaxGraph ?
     * 
     * Scenario:
     * 
     *   Control flow is changed in a way that requires potentially adding new AST nodes.
     * 
     *   To achieve a level of indirection necessary to either add a node, or append to an existing one, 
     *   an AbstractNode could be combined and made concrete by the syntax-graph-parser.
     * 
     *   
     * 
     * */

import { Sequence } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";
import { NodeName } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_2_2_structure-implementation.enum";
import { UnParser } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/system/un-parser";


export class AbstractStatement {
    public NodeName = NodeName.AbstractStatement
}


export class AbstractBlockStatement implements Sequence<AbstractStatement> {
    public NodeName = NodeName.AbstractBlock;
    public Values: AbstractStatement[];

    constructor() {}
    
    public UnParse(ctx: UnParser): string {
        return ctx.transpile(this);
    }
}