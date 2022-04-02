import { UnParser }        from "wrapt.co_re/lib/Domain [╍🌐╍🧭╍]/system/un-parser";
import { ConceptExpression, Expression, FunctionNode, 
         Duality, InfixStructure, Sequence, Structure, Value, IIdentifier } 
                           from "wrapt.co_re/lib/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";
import { NodeName }        from "wrapt.co_re/lib/Domain [╍🌐╍🧭╍]/syntax/0_1_2_2_structure-implementation.enum";
import { Operator }        from "wrapt.co_re/lib/Domain [╍🌐╍🧭╍]/object/0_operation-types_🔍/1_primitive-operators";

import { ConceptOperator } from "./1_1_0_expression-elements";

import  { ArrayLiteral, ClassLiteral, HashLiteral, Identifier } 
                           from "./1_3_1_literal"; 
                           
import { CallableNode } from "./1_0_1_root";
import { STREAM_DIRECTION } from "wrapt.co_re/lib/Domain [╍🌐╍🧭╍]/syntax/stream-direction.enum";
        {_:                     `
████████████████████████████████████████████████████████████████████████████████████████████
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░`   
                                                              }


export class PrefixExpression implements Structure {
    public NodeName = NodeName.PrefixExpression;
    
    constructor(
        public Operator: Operator, 
        public Right: Expression
    ) { }

    public UnParse(ctx: UnParser) {
        return "(" + this.Operator + ctx.transpile(this.Right) + ")";
    }
}

export class InfixExpression implements InfixStructure<Operator, Expression> {
    public NodeName = NodeName.InfixExpression;
    
    constructor(
             public Left: Expression, 
             public Operator: Operator, 
             public Right: Expression
    ) { }

    public UnParse(ctx: UnParser) {
        return "(" + ctx.transpile(this.Left) + " " +
            this.Operator + " " + ctx.transpile(this.Right) + ")";
    }
}

export class PrefixConceptExpression implements Structure<ConceptOperator, ConceptExpression> {
    public NodeName = NodeName.PrefixConceptExpression;
    
    constructor(
        public Operator: ConceptOperator, 
        public Right:    ConceptExpression
    ) { }

    public UnParse(ctx: UnParser) {
        return "(" + ctx.transpile(this.Operator) + ctx.transpile(this.Right) + ")";
    }
}

export class InfixConceptExpression implements InfixStructure<ConceptOperator, ConceptExpression> {
    public NodeName = NodeName.InfixConceptExpression;
    
    constructor(
        public Left:     ConceptExpression, 
        public Operator: ConceptOperator, 
        public Right:    ConceptExpression
    ) { }

    public UnParse(ctx: UnParser) {
        return "(" + ctx.transpile(this.Left) + " " +
            ctx.transpile(this.Operator) + " " + ctx.transpile(this.Right) + ")";
    }
}

export class CallExpression implements Sequence<Expression> {
    public NodeName = NodeName.CallExpression;
    
    constructor(
        public Function: CallableNode,
        /** Arguments to function call */
        public Values: Expression[] = [] as Expression[]) { }

    public UnParse(ctx: UnParser) {
        var callArgs = this.Values.map(function (arg) { return ctx.transpile(arg); });
        return ctx.transpile(this.Function) + "(" + callArgs.join(",") + ")";
    }
}

export class NewExpression implements Value  {
    public NodeName = NodeName.NewExpression;

    constructor(public Value: IIdentifier | ClassLiteral | ArrayLiteral | HashLiteral) { }

    public UnParse(ctx: UnParser) {
        return "new " + ctx.transpile(this.Value);
    }
}

export class IndexExpression implements Duality {
    public NodeName = NodeName.IndexExpression;

    constructor(public Left: Expression, 
                public Right: Expression // Index
    ) { }

    public UnParse(ctx: UnParser) {
        var transpiledIndex = ctx.transpile(this.Right);
        return ctx.transpile(this.Left) + "[" + transpiledIndex + "]";
    }
}

// TODO: revisit this:
export class StreamExpression {
    public NodeName = NodeName.StreamExpression;

    constructor(public Direction: STREAM_DIRECTION, 
             public Source, public Sink, 
             public Transforms = []
    ) { }

    public UnParse(ctx: UnParser): string {
        return ctx.unParse(this);
    }
}


