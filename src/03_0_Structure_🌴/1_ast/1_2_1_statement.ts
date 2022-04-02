
import { ConceptExpression, ControlInvocation, ControlStructureInvocation, DataOperationInvocation, DataStructureDeclaration, Expression, IIdentifier } 
                    from "wrapt.co_re/lib/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";
import { NodeName } from "wrapt.co_re/lib/Domain [╍🌐╍🧭╍]/syntax/0_1_2_2_structure-implementation.enum";
import { UnParser } from "wrapt.co_re/lib/Domain [╍🌐╍🧭╍]/system/un-parser";
import { BlockStatement } from "./1_0_1_root";
import { ArrayLiteral, ClassLiteral, Identifier } from "./1_3_1_literal";



/****
 * TYPES OF STATEMENTS:
 * 
 */
//  - Data-Structure Declarations                 
//  |__ LetStatement                 // float applePi = 3.14159;
//  |__ ClassStatement               // class Apple{ Apple(){ } }
//  |__ ConceptStatement             // concept Metaphor { Food --> Knowledge }

//  - Data-Operation Invocations     
//  |__ AssignmentStatement          // applePi = 22/7;
//  |__ Index[ed]AssignmentStatement // apples[2] = new Apple();

//  - Control Invocations 
//  |__ ReturnStatement     // return "Run the risk of wearing out this " + METAPHOR;
//  |__ ExpressionStatement // new Apple().peel();

//  - Control-Structure Invocations 
//  |__ IfStatement         // if (I.am(A_HORSE || it.is(THE_GREAT_DEPRESSION)) {eat(apple);}
//  |__ WhileStatement      // while (NOT_ASLEEP) { create(new Metaphor()); }
//  |__ ForStatement        // for (idea, head) { systemize(formalize(head[idea])); 
//  |__ SleepStatement      // sleep(7 * 60 * 60 * 1000) { print("I AM FULLY CHARGED"); }
//  |__ ExecStatement       // exec("dreams-of-a-module-system") { runMainWithShinySpecialThingsLoaded(); }


/******************************************************
 *
 *            Data-Structure Declarations
 *
 *****************************************************/

 export class LetStatement implements DataStructureDeclaration {
    public NodeName = NodeName.LetStatement;

    constructor (
        public DataType: string, public Identity: Identifier, public Value: Expression) {
    }
    
    public UnParse(ctx: UnParser) {
        return ctx.transpile(this);
    }
}

export class ClassStatement implements DataStructureDeclaration {
    public NodeName = NodeName.ClassStatement;

    constructor(public Identity: IIdentifier, public Value: ClassLiteral) { }
    
    public UnParse(ctx: UnParser) {
        return ctx.transpile(this);
    }
}

/**  
 * /T\          Concept
 * is           : :
 *              a               [abstract [structure, sequence, operator or graph]]
 *              
 *              of              
 *                              : :
 *                              /T\             [abstract expressions]
 *                                              connected
 *                              by              [abstract operators]
 *                              -------------------
 *              -------------------
 * ----------------
 */
export class ConceptStatement implements DataStructureDeclaration {
    public NodeName = NodeName.ConceptStatement;
                
    constructor(public Identity: IIdentifier, 
                public Value: ConceptExpression) { }

    public UnParse(ctx: UnParser) {
        return ctx.transpile(this);
    }
}


/******************************************************
 *
 *            Data-Operation Invocations
 * 
 *****************************************************/

export class AssignmentStatement implements DataOperationInvocation {
    public NodeName = NodeName.AssignmentStatement;

    constructor(public Subject: IIdentifier, public Operand: Expression) {}

    public UnParse(ctx: UnParser) {
        return ctx.transpile(this.Subject) + " = " + ctx.transpile(this.Operand);
    }
}

export class IndexedAssignmentStatement implements DataOperationInvocation {
    public NodeName = NodeName.IndexedAssignmentStatement;
    
    constructor(public Subject: Expression, 
                public Index:   Expression, 
                public Operand: Expression) { }

    public UnParse(ctx: UnParser) {
        return ctx.transpile(this.Subject) + "[" + ctx.transpile(this.Index) + "] = " + ctx.transpile(this.Operand) + ";";
    }
}



/******************************************************
 *
 *                Control Invocations
 * 
 *****************************************************/

export class ReturnStatement implements ControlInvocation {
    public NodeName = NodeName.ReturnStatement;

    constructor(public Operand: Expression) { }

    public UnParse(ctx: UnParser) {
        return "return " + ctx.transpile(this.Operand);
    }
}

export class ExpressionStatement implements ControlInvocation {
    public NodeName = NodeName.ExpressionStatement
                // the first token of the expression
    constructor(public Operand: Expression) { }

    public UnParse(ctx: UnParser) {
        return this.Operand && this.Operand.UnParse ? this.Operand.UnParse(ctx) : "";
    }
}



/******************************************************
 *
 *            Control-Structure Invocations
 * 
 *****************************************************/

export class IfStatement implements ControlStructureInvocation {
    public  NodeName = NodeName.IfStatement;
                
    constructor(public Operand: Expression, public Consequence: BlockStatement, public Alternative: BlockStatement) { }

    public UnParse(ctx: UnParser) {
        return ctx.transpile(this);
    }
}

export class ForStatement implements ControlStructureInvocation {
    public NodeName = NodeName.ForStatement;
                
    constructor(public Element: Identifier, 
                public Operand: Expression, 
                public Consequence: BlockStatement) { }

    public UnParse(ctx: UnParser) {
        return ctx.transpile(this);
    }
}

export class WhileStatement implements ControlStructureInvocation {
    public NodeName = NodeName.WhileStatement;

    constructor(public Operand: Expression, public Consequence: BlockStatement) { }

    public UnParse(ctx: UnParser) {
        return ctx.transpile(this);
    }
}

export class SleepStatement implements ControlStructureInvocation {
    public NodeName = NodeName.SleepStatement;

    constructor(public Operand: Expression, public Consequence: BlockStatement) {}

    public UnParse(ctx: UnParser) {
        return ctx.transpile(this);
    }
}

export class ExecStatement implements ControlStructureInvocation {
    public NodeName = NodeName.ExecStatement;

    constructor(public Operand: ArrayLiteral, public Consequence: BlockStatement) { }

    public UnParse(ctx: UnParser) {
        var out = "";
        return out;
    }
}