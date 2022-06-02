
import { Node, Expression, Duality, Value, IGraphNode, IGraphEdge, AbstractOperator }  
                        from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";
import { NodeName }     from 'wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_2_2_structure-implementation.enum';
import { UnParser }     from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/system/un-parser.js"

import { FunctionLiteral, Identifier, StringLiteral } 
                        from './1_3_1_literal';


/** 🔗 */
export class Pair<L extends Expression, R extends Expression> implements Duality<L, R> {
    NodeName = NodeName.Pair;
    constructor(public Left: L, public Right: R) {}

    public UnParse(ctx: UnParser) { return ctx.transpile(this); }
}

/** 🧩🔗 */
export class HashPair implements Node, Duality<Identifier, Expression> {
    NodeName = NodeName.HashPair;
    
    constructor(public Left: Identifier, public Right: Expression) { }

    public UnParse(ctx: UnParser) { return ctx.transpile(this); }
}

/** 🧩🔗☰ */
export class ClassPair<V extends Expression = ClassProperty> implements Node, Duality<Identifier, V> {
    NodeName = NodeName.ClassPair;
    
    constructor(public Left: Identifier, public Right: V) { }

    public UnParse(ctx: UnParser) { return ctx.transpile(this); }
}

/** ☰📘 */
export class ClassProperty implements Value { 
    NodeName = NodeName.ClassProperty;
    public Value: Expression;

    constructor(
        public Type:      string, 
        public Modifiers: number[]
    ) { }

    public UnParse(ctx: UnParser) { return ctx.transpile(this); }
}

/** ☰⏰ */
export class ClassMethod implements Value { 
    NodeName = NodeName.ClassMethod;
    public Value: FunctionLiteral;
    
    constructor(
        public Type:       string, 
        public Modifiers:  number[]
    ) { }

    public UnParse(ctx: UnParser) { return ctx.transpile(this); }
}

/** {  💎  }   **/
export class GraphNode<
                        K extends Node = StringLiteral,
                        V extends Node = Expression
                      > 
                      implements IGraphNode<K, V> {
    NodeName = NodeName.GraphNode;
    
    constructor(
        public Left:  K, // id
        public Right: V // value
    ){} 

    public UnParse(ctx: UnParser) { return ctx.transpile(this); }
}

/**  {  💎🔗💎  }   **/
 export class GraphEdge<
                            Op  extends AbstractOperator<Val>, 
                            Val extends Node = Expression,
                            Key extends Node = StringLiteral 
                        > 
                        implements IGraphEdge<Op, Key, Val> {
    NodeName = NodeName.GraphEdge;
    
    constructor(
        public Operator: Op,
        public Right: Duality<Key, Key>, // to, from
    ){} 

    public UnParse(ctx: UnParser) { return ctx.transpile(this); }
}