

import { ConceptExpression, ConceptSequence, Duality, Expression, FunctionNode, IGraph, IIdentifier, Sequence, Value } 
                    from "wrapt.co_re/src/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";
import { NodeName } from "wrapt.co_re/src/Domain [╍🌐╍🧭╍]/syntax/0_1_2_2_structure-implementation.enum";
import { UnParser } from "wrapt.co_re/src/Domain [╍🌐╍🧭╍]/system/un-parser";

import { BlockStatement } from "./1_0_1_root";
import { ConceptOperator, GraphOperator } from "./1_1_0_expression-elements";
import { ClassMethod, ClassPair, ClassProperty, GraphEdge, GraphNode, HashPair } from "./1_3_0_literal-elements";




/** 
 * 
 *                    /%*\
 *                  /%    *\
 *                /%        *\
 *              /%{}{}{}{}{}{}*\
 *            /%       {}       *\  
 *          /%         {}         *\
 *        /%           {}           *\
 *      /%             {}             *\
 *    /%================================*\
 * 
 * 
 *                 Structure:
 */

export class BooleanLiteral implements Value {
    public NodeName = NodeName.Boolean;

    constructor(public Value: boolean) { }

    public UnParse(ctx: UnParser) {
        return this.Value.toString();
    }
}

export class IntegerLiteral implements Value {
    public NodeName = NodeName.IntegerLiteral;

    constructor(public Value: number) { }
    
    public UnParse(ctx: UnParser) {
        return this.Value.toString();
    }
}

export class FloatLiteral implements Value {
    public NodeName = NodeName.FloatLiteral;

    constructor(public Value: number) { }
    
    public UnParse(ctx: UnParser): string {
        return this.Value.toString();
    }
}

export class StringLiteral implements Value {
    public NodeName = NodeName.StringLiteral;

    constructor(public Value: string, public modifiers?: number[]) { }
    
    public UnParse(ctx: UnParser) {
        return "\"" + this.Value + "\"";
    }
}

export class HashLiteral implements Sequence<HashPair> {
    public NodeName = NodeName.HashLiteral;

    constructor(public Values: HashPair[] = [] as HashPair[]) {}

    public UnParse(ctx: UnParser) {
        return ctx.transpile(this);
    }
}




/**
 * 
 *    [[[[[[[[[[      ]]]]]]]]]]
 *    [[                      ]]
 *    [[                      ]]
 *    [[  ==================  ]]
 *    [[  ==================  ]]
 *    [[                      ]]
 *    [[  ==================  ]]
 *    [[  ==================  ]]
 *    [[                      ]]
 *    [[                      ]]
 *    [[[[[[[[[[      ]]]]]]]]]]
 * 
 * 
 *             Sequence:
 */

export class ArrayLiteral<T = Expression> implements Sequence<T> {
    public NodeName = NodeName.ArrayLiteral;

    constructor(public Values: T[] = [] as T[]) { }

    public UnParse(ctx: UnParser) {
        return ctx.transpile(this); 
    }
}


export class ConceptSequenceLiteral implements ConceptSequence {
    public NodeName = NodeName.ConceptSequenceLiteral;

    constructor( 
        public Values: ConceptExpression[],
    ) { }

    public UnParse(ctx: UnParser) {
        return ctx.transpile(this);
    }
}




/**
 * 
 *           (((         )))
 *         ((               ))
 *       ((                   ))
 *     ((          ___          ))
 *    ((           +++           ))
 *   ((        ____+++____        ))
 *   ((        +++++++++++        ))
 *   ((            +++            ))
 *    ((           +++           ))
 *     ((                       ))
 *       ((                   ))
 *         ((               ))
 *           (((         )))
 * 
 * 
 *              Operation:
 */

export class WheelLiteral implements Sequence<Duality<FloatLiteral, Expression>> {
    public NodeName = NodeName.WheelLiteral;

    constructor(public Values: Duality<FloatLiteral, Expression>[]
    ) { }

    public UnParse(ctx: UnParser) {
        return ctx.transpile(this);
    }
}

// TODO: handle the dual nature, and ["flipping over" point]
export class MobiusLiteral extends WheelLiteral {
    public NodeName = NodeName.MobiusLiteral;
}


export class FunctionLiteral implements FunctionNode {
    public NodeName = NodeName.FunctionLiteral; 

    constructor(
        public ReturnType: string, 
        public ParameterTypes: string[], 
        public Values: Identifier[] = [] as Identifier[], 
        public Consequence: BlockStatement, 
        public FunctionName?: string,
        public ObjectContext?: any) { }

    public UnParse(ctx: UnParser) {
        return ctx.transpile(this);
    }
}

export class PureFunctionLiteral implements FunctionNode {
    public NodeName = NodeName.PureFunctionLiteral;

    constructor(
        public ReturnType: string, 
        public ParameterTypes: string[], 
        public Values: Identifier[] = [] as Identifier[],
        public Consequence: BlockStatement, 
        public FunctionName?: string) { }

    public UnParse(ctx: UnParser) {
        return ctx.transpile(this);
    }
}




/**
 * 
 *       /∕             \\
 *      /∕               \\
 *     /∕  **   ***   **  \\
 *    /∕    **  ***  **    \\
 *   /∕      *********      \\
 *   \\      *********      ∕/
 *    \\    **  ***  **    ∕/
 *     \\  **   ***   **  ∕/
 *      \\               ∕/
 *       \\             ∕/
 * 
 * 
 *          Indirection:
 */

 export class Identifier implements IIdentifier {
    public NodeName = NodeName.Identifier;

    constructor(public Value: string) { }
    
    public UnParse(ctx: UnParser) {
        return ctx.replaceBuiltinIdentifiers(this.Value);
    }
}

export class ClassLiteral implements Duality<Sequence<ClassPair>, Sequence<ClassPair<ClassMethod>>> {
    public NodeName = NodeName.ClassLiteral;

    constructor(public Left: Sequence<ClassPair<ClassProperty>>, 
                public Right: Sequence<ClassPair<ClassMethod>>,
                public className?: string,
                public Concept?: Identifier
    ) {}

    public UnParse(ctx: UnParser) {
        return ctx.transpile(this);
    }
}


export class GraphLiteral implements IGraph<Expression, GraphOperator, StringLiteral> {
    public NodeName = NodeName.GraphLiteral;

    constructor(public Left: Sequence<GraphEdge<GraphOperator, Expression, StringLiteral>>,
                public Right: Sequence<GraphNode<StringLiteral, Expression>>
    ) {}

    public UnParse(ctx: UnParser) {
        return ctx.transpile(this);
    }
}

export class ConceptGraphLiteral implements IGraph<ConceptExpression, ConceptOperator, StringLiteral> {
    public NodeName = NodeName.ConceptGraph;

    constructor(public Left: Sequence<GraphEdge<ConceptOperator, ConceptExpression, StringLiteral>>,
                public Right: Sequence<GraphNode<StringLiteral, ConceptExpression>>
    ) {}

    public UnParse(ctx: UnParser) {
        return ctx.transpile(this);
    }
}