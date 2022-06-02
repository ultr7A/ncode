import { NodeName }                   from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_2_2_structure-implementation.enum";
import { FunctionNode, IBlockStatement, IIdentifier, Statement } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept"; 
import { UnParser }                   from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/system/un-parser";
import { IndexExpression, NewExpression } from "./1_1_1_expression";

/** 📘📚 */
export class BlockStatement implements IBlockStatement {
    public NodeName = NodeName.BlockStatement;
                
    constructor(public Values: Statement[] = [] as Statement[]) { }

    public UnParse(ctx: UnParser): string {                          
        var strStatements, statements = this.Values;
        for (var bs = 0, l = statements.length; bs < l; bs++) {
            var stmt = statements[bs];
            strStatements += stmt.UnParse(ctx) + "\n";
        }
        return strStatements;
    }
}

/** 📘📚 */
export class Program implements IBlockStatement {
    public NodeName = NodeName.Program;

    constructor (public Values: Statement[]) { }
    
    public UnParse(ctx: UnParser): string {
        var statements = ctx.transpileBlock(this.Values, true);
        // console.log("injected header: ", ctx.getProgramHeader());
        // console.log("-------");
        // console.log("injected footer: ", ctx.injectedContextUpdate);
        // console.log("-------");
        return ctx.getProgramHeader() +
            statements + ctx.injectedContextUpdate;
    };
    
}


export type CallableNode = IIdentifier | FunctionNode | IndexExpression | NewExpression; // TODO: base NewExpression off of interface