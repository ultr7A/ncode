import { AbstractOperator, ConceptExpression } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept.js"
import { NodeName }                            from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_2_2_structure-implementation.enum.js"
import { UnParser }                            from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/system/un-parser.js"

import { CallExpression } from "./1_1_1_expression.js"



/**  {  💎🔗(⏰)🔗💎  }   */
export class GraphOperator implements AbstractOperator<CallExpression> {
    NodeName = NodeName.GraphOperator;

    constructor(
        public Operator: CallExpression,
        public readonly Precedence = 0
    ) {}

    public UnParse(ctx: UnParser) {
        return ctx.transpile(this.Operator); 
    }
}




/**  {  💎( ⏰ )💎  }    */
export class ConceptOperator implements AbstractOperator<ConceptExpression> {
    NodeName = NodeName.ConceptOperator;

    constructor(
        public Operator: ConceptExpression,
        public readonly Precedence = 0
    ) {}

    public UnParse(ctx: UnParser) {
        return ctx.transpile(this.Operator);
    }
}


// TODO: combine this with SyntaxGraphParser code:
/**  {  🚥( ⏰ )🚥  }   */
export class ControlFlowOperator implements AbstractOperator<ConceptExpression> {
    NodeName = NodeName.ControlFlowOperator;

    constructor(
        public Operator: ConceptExpression, // This will likely change to a FlowGraphExpression..
        public readonly Precedence = 0
    ) {}

    public UnParse(ctx: UnParser) {
        return ctx.transpile(this.Operator);
    }
}

// TODO: combine this with SyntaxGraphParser code:
/**  {  💽( ⏰ )💽  }   */
export class DataFlowOperator implements AbstractOperator<ConceptExpression> {
    NodeName = NodeName.DataFlowOperator;

    constructor(
        public Operator: ConceptExpression, // This will likely change to a FlowGraphExpression..
        public readonly Precedence = 0
    ) {}

    public UnParse(ctx: UnParser) {
        return ctx.transpile(this.Operator);
    }
}