import { Node, Expression, Statement, Value, FunctionNode } 
                                    from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";
import { Operator }                 from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/object/0_operation-types_🔍/1_primitive-operators.js";
import { STREAM_DIRECTION }         from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/stream-direction.enum.js";
import { BuiltinGraphOperatorType } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/object/0_operation-types_🔍/4_graph-operators.js";


import { Analyzer }       from "../../../2_compiler/0_3_0_analyzer/1_3_expression-analyzer.js"
import { Precedence, precedences }     from "../../0_0_parser-core/2_1_precedence.js"
import { InfixParseFn, PrefixParseFn } from "../../0_0_parser-core/3_0_parse-functions.js"
import { GraphParserOne } from "./0_2_4_graph-parser.one.js"
import { TokenizerOne } from "../../../0_tokenizer/1_2_tokenizer.implementation/2_1_1_tokenizer.one.js"
import { modifierNames, Token, TypedTokenLiteral } from "../../../../01_1_ELEMENT/1_token_💧/2_1_token.js"


import { GraphOperator }           from "../../../../03_0_Structure_🌴/1_ast/1_1_0_expression-elements.js"
import { CallExpression, IndexExpression, InfixExpression, NewExpression, PrefixExpression, StreamExpression } 
                                   from "../../../../03_0_Structure_🌴/1_ast/1_1_1_expression.js"
import { AssignmentStatement, ClassStatement, ExecStatement, ExpressionStatement, ForStatement, IfStatement, IndexedAssignmentStatement, LetStatement, ReturnStatement, SleepStatement, WhileStatement } 
                                   from "../../../../03_0_Structure_🌴/1_ast/1_2_1_statement.js"
import { ArrayLiteral, BooleanLiteral, ClassLiteral, FloatLiteral, FunctionLiteral, GraphLiteral, HashLiteral, Identifier, IntegerLiteral, PureFunctionLiteral, StringLiteral } 
                                   from "../../../../03_0_Structure_🌴/1_ast/1_3_1_literal.js"
import { BlockStatement, Program } from "../../../../03_0_Structure_🌴/1_ast/1_0_1_root.js"
import { ClassMethod, ClassPair, ClassProperty, GraphEdge, GraphNode, HashPair }
                                   from "../../../../03_0_Structure_🌴/1_ast/1_3_0_literal-elements.js"
import { getDefaultValueNodeForDataType } 
                                   from "../../../../03_0_Structure_🌴/1_ast/3_util_⚙/ast-util.js"


import { CodeData } from "../../../../01_2_Sequence_📘🌊/0_source/source-code.js"
import { AbstractParser } from "../../0_2_abstract-parser/0_0_1_abstract-parser.js";
import { setToken } from "../../0_0_parser-core/0_3_set-token.js";
import { IExpressionParser } from "../../0_0_parser-core/expression-parser.interface.js";
import { NodeName_To_DataType } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/primitive/type.enum.js";



export class ExpressionParserOne extends     AbstractParser // AbstractExpressionParser<TypedTokenLiteral> 
                                 implements  IExpressionParser       {
                                    // AbstractParser<TypedTokenLiteral, Node, Expression, Operator>

    
    public analyzer: Analyzer;
    public graphParser: GraphParserOne<GraphOperator, Expression>;

    public currentToken:  TypedTokenLiteral = null;
    public peekToken: TypedTokenLiteral = null;

    public prefixParseFns = {} as Partial<{ [token in Token]: PrefixParseFn<Expression, Node> }>;
    public infixParseFns  = {} as Partial<{ [token in Token]:  InfixParseFn<Expression, Node> }>;

    
    public setCurrentToken(token) {
        this.currentToken = token;
        return token;
    }

    public setPeekToken(token) {
        this.peekToken = token;
        return token;
    }

    constructor(tokenizer: TokenizerOne) {
        super(tokenizer, precedences);
        super.setSubClass(this);
        
        this.analyzer = new Analyzer();
        
        /* *************************************************** *
         *  Infix expressions:                                 *
         * *************************************************** */
        // Binary / Infix Operators:
        //                Primitive:
        //                      Numeric:
        this.registerInfix(Token.PLUS,     this.parseInfixExpression);
        this.registerInfix(Token.MINUS,    this.parseInfixExpression);
        this.registerInfix(Token.SLASH,    this.parseInfixExpression);
        this.registerInfix(Token.ASTERISK, this.parseInfixExpression);
        this.registerInfix(Token.MOD,      this.parseInfixExpression);
        //                      Logical:
        this.registerInfix(Token.EQ,     this.parseInfixExpression);
        this.registerInfix(Token.NOT_EQ, this.parseInfixExpression);
        this.registerInfix(Token.AND,    this.parseInfixExpression);
        this.registerInfix(Token.OR,     this.parseInfixExpression);
        this.registerInfix(Token.LT,     this.parseInfixExpression);
        this.registerInfix(Token.GT,     this.parseInfixExpression);
        //                Concept Operators:
        // this.registerInfix(Token.LPAREN,this.parseConceptOperator);

        // Function call:
        this.registerInfix(Token.LPAREN,    this.parseCallExpression as InfixParseFn<Expression, Node>);
        
        // Data-access:
        this.registerInfix(Token.LBRACKET, this.parseIndexExpression);
        this.registerInfix(Token.DOT,   this.parseDotIndexExpression);

        /* *************************************************** *
         *  Prefix expressions:                                *
         * *************************************************** */
        this.registerPrefix(Token.IDENT, this.parseIdentifier);
        this.registerPrefix(Token.IDENT, this.parseIdentifier);
        // Primitives
        this.registerPrefix(Token.TRUE,   this.parseBoolean);
        this.registerPrefix(Token.FALSE,  this.parseBoolean);
        this.registerPrefix(Token.INT,    this.parseIntegerLiteral);
        this.registerPrefix(Token.FLOAT,  this.parseFloatLiteral);
        this.registerPrefix(Token.STRING, this.parseStringLiteral);
        
        // Function declarations:
        this.registerPrefix(Token.PURE,     this.parsePureFunctionLiteral);
        this.registerPrefix(Token.FUNCTION, this.parseFunctionLiteral);

        // Structures, sequences and graphs:
        this.registerPrefix(Token.LBRACKET, this.parseArrayLiteral);
        this.registerPrefix(Token.LBRACE,   this.parseHashLiteral);
        // TODO: switch modes:
        // this.registerPrefix(Token.ASTERISK_LBRACE, this.graphParser.parseGraph);

        // Data-operation invocation:
        this.registerPrefix(Token.NEW,  this.parseNewExpression);
        //
        this.registerPrefix(Token.EXEC, this.parseExecStatement);

        // Unary / Prefix operators:
        //                  Primitive:
        this.registerPrefix(Token.BANG,   this.parsePrefixExpression);
        this.registerPrefix(Token.MINUS,  this.parsePrefixExpression);
        this.registerPrefix(Token.TYPEOF, this.parsePrefixExpression);
        //                  Concept Operators:
        // TODO: switch modes:
        // this.registerPrefix(Token.POUND_LPAREN,   this.parseConceptOperator);
        

        // (Grouped expression)
        this.registerPrefix(Token.LPAREN,   this.parseGroupedExpression);

        // TODO: switch modes:
        // this.registerPrefix(Token.POUND_LBRACKET, this.parseConceptSequenceLiteral);

        this.registerPrefix(Token.LCOMMENT, this.parseCommentBlock as PrefixParseFn<Node, Node>); // It's okay that Node isn't returned for comments.
    }


    public loadSourceCode(code: CodeData) {
        (this.tokenizer as TokenizerOne).loadSourceCode(code as string);
    }

    public doParseProgram(statements: Statement[], program: Program) {
        this.nextToken();
        while (!this.currentTokenIs(Token.EOF)) {
            var stmt = this.parseStatement();
            if (stmt != null) {
                if (stmt.NodeName == "ExpressionStatement") {
                    if ((stmt as ExpressionStatement).Operand == null) {
                        continue;
                    }
                }
         
                program.Values.push(stmt);
            }
            this.nextToken();
        }
    }



    parseModifiers(): number[] {
        let modifiers = [], 
            modifier = modifierNames.indexOf(this.currentToken.Type as Token);
        
        while (modifier > -1) {
            modifiers.push(modifier);
            this.nextToken();
            modifier = modifierNames.indexOf(this.currentToken.Type as Token);
        }

        return modifiers;
    }

    /**
     * parseExpression
     * @argument {number} precedence
     * @argument {boolean} declaration // aka: identAsString // TODO: check if still needed?
     * @returns  {expressions.Expression}
     */
    public parseExpression(precedence: number, declaration = false): Expression {
        let currentTokenType = this.currentToken.Type;
        let prefix = this.prefixParseFns[currentTokenType], leftExp;

        if (declaration) {
            leftExp = this.parseDeclaration(currentTokenType);
        } else {
            leftExp = prefix && prefix();
        }

        // console.log("parseExpression() ... ")
        // console.log({
        //     peek_token_is__NOT__SEMICOLON: !this.peekTokenIs(Token.SEMICOLON),
        //     precedence: precedence,
        //     peekPrecence: this.peekPrecedence()
        // })
        this.peekTokenIs(Token.SEMICOLON) && precedence < this.peekPrecedence()

        while (!this.peekTokenIs(Token.SEMICOLON) && precedence < this.peekPrecedence()) {
            let infix = this.infixParseFns[this.peekToken.Type];
            
            if (!infix) {
                if (!leftExp) {
                    this.noPrefixParseFnError(currentTokenType);
                    return null;
                }

                return leftExp;
            } 
            this.nextToken();
            leftExp = infix(leftExp);
        }
        
        return leftExp;
    }


    public parseDeclaration(currentTokenType: Token) {
        let pure = false;

        if (currentTokenType === Token.PURE) {
            let dataType = this.checkDataType();
            pure = true;
            if (this.peekTokenIs(Token.FUNCTION) || dataType) {
                if (dataType) {
                    if (!this.peekTokenIs(Token.FUNCTION)) {
                        this.noPrefixParseFnError(this.peekToken.Literal);
                    }
                    this.nextToken();
                }
            }
            return this.parseFunctionLiteral(null, dataType, pure);
        }
    }

    public parsePrefixExpression(): Node {
        var expression = new PrefixExpression(this.currentToken.Literal as Operator, null);

        this.nextToken();
        expression.Right = this.parseExpression(Precedence.PREFIX);
        return expression;
    }

    public parseInfixExpression(left: Expression): Node {
        var expression = new InfixExpression(left, this.currentToken.Literal as Operator, null), 
            precedence = this.curPrecedence();

        this.nextToken();
        expression.Right = this.parseExpression(precedence);
        return expression;
    }

    public parseGroupedExpression(): Expression {
        this.nextToken();
        let exp = this.parseExpression(Precedence.LOWEST);
        if (!this.expectPeek(Token.RPAREN)) {
            return null;
        }
        return exp;
    }

    public parseCallExpression(fun: FunctionNode | Identifier) {
        var exp = new CallExpression(fun);
        exp.Values = this.parseExpressionList(Token.RPAREN);
        return exp;
    }

    public parseNewExpression(): NewExpression {
        var exp = new NewExpression(null);

        if (!this.expectPeek(Token.IDENT)) {
            return null;
        }

        let constructorFunction: FunctionNode | Identifier;

        if (this.peekTokenIs(Token.IDENT)) {
            constructorFunction = this.parseIdentifier();
        } else if (this.peekTokenIs(Token.FUNCTION)) {
            constructorFunction = this.parseFunctionLiteral(null, null, false);
        } else {
            this.parseError("NewExpression must specify constructor, as Identifier or FunctionLiteral");
            return null;
        }

        exp.Value = this.parseCallExpression(constructorFunction);
        return exp;
    }

    public parseIndexExpression(left: Expression): Node {
        let exp: IndexExpression | IndexedAssignmentStatement = null;

        this.nextToken();
        let Index = this.parseExpression(Precedence.LOWEST);
        if (!this.expectPeek(Token.RBRACKET)) {
            return null;
        }
        if (!this.peekTokenIs(Token.ASSIGN)) {
            exp = new IndexExpression(left, Index);
        }
        else {
            exp = new IndexedAssignmentStatement(left, Index, null);
            this.nextToken();
            this.nextToken();
            exp.Operand = this.parseExpression(Precedence.LOWEST);
        }
        return exp;
    }

    public parseDotIndexExpression(left: Expression): Node {
        let exp: IndexExpression | IndexedAssignmentStatement = null, 
            Index: Expression = null;

        if (this.peekTokenIs(Token.IDENT)) {
            this.nextToken();
            var identValue = this.currentToken.Literal;
            Index = new StringLiteral(identValue);
        
        } else {
            Index = this.parseExpression(Precedence.LOWEST);
        }

        if (!this.peekTokenIs(Token.ASSIGN)) {
            exp = new IndexExpression(left, Index);
        } else {
            exp = new IndexedAssignmentStatement(left, Index, null);
            this.nextToken();
            this.nextToken();
            exp.Operand = this.parseExpression(Precedence.LOWEST);
        }

        return exp;
    }

    //TODO: Revisit this:
    public parseReadStreamExpression(source) {
        const streamTransformErr = " Parse Error; invalid element in stream transform";
        let exp = new StreamExpression(STREAM_DIRECTION.READ, null, null, null);

        exp.Source = source;
        while (this.currentToken.Type == Token.SOURCE) {
            this.nextToken();
            if (!this.currentTokenIs(Token.IDENT) && !this.currentTokenIs(Token.FUNCTION)) {
                this.parseError(streamTransformErr);
                return null;
            }
            exp.Transforms.push(this.parseExpression(Precedence.LOWEST));
            this.nextToken();
        }
        exp.Sink = exp.Transforms.pop();
        return exp;
    }

    //TODO: Revisit this:
    public parseWriteStreamExpression(sink) {
        const streamTransformErr = " Parse Error; invalid element in stream transform";
        let exp = new StreamExpression(STREAM_DIRECTION.WRITE, null, null, null);
            
        exp.Sink = sink;
        while (this.currentToken.Type == Token.SINK) {
            this.nextToken();
            if (!this.currentTokenIs(Token.IDENT) && !this.currentTokenIs(Token.FUNCTION)) {
                this.parseError(streamTransformErr);
                return null;
            }
            exp.Transforms.push(this.parseExpression(Precedence.LOWEST));
            this.nextToken();
        }
        exp.Source = exp.Transforms.pop();
        return exp;
    }


    public parseStatement(): Statement {
        if (this.currentToken.Type == Token.IDENT && this.peekTokenIs(Token.ASSIGN)) {
            return this.parseAssignmentStatement();
        }
        if (this.isCustomDataType() && this.peekTokenIs(Token.IDENT)) {
            return this.parseLetStatement();
        }
        else {
            switch (this.currentToken.Type) {
                case Token.RETURN:
                    return this.parseReturnStatement();
                case Token.CONST:
                case Token.LET:
                case Token.LET_BOOL:
                case Token.LET_INT:
                case Token.LET_FLOAT:
                case Token.LET_STRING:
                case Token.LET_ARRAY:
                case Token.LET_OBJECT:
                case Token.LET_FUNCTION:
                    return this.parseLetStatement();
                case Token.PURE:
                    return this.parseLetStatement(true);
                case Token.CONCEPT:
                    // TODO: Defer to other parser:
                    return this.parseConceptStatement();
                case Token.CLASS:
                    return this.parseClassStatement();
                case Token.IF:
                    return this.parseIfStatement();
                case Token.WHILE:
                    return this.parseWhileStatement();
                case Token.FOR:
                    return this.parseForStatement();
                case Token.SLEEP:
                    return this.parseSleepStatement();
                default:
                    return this.parseExpressionStatement();
            }
        }
    }

    public parseConceptStatement(): Statement
    {
        throw new Error("Method not implemented.");
    }
    
    public parseExpressionStatement(): ExpressionStatement {
        var stmt = new ExpressionStatement(null);

        stmt.Operand = this.parseExpression(Precedence.LOWEST);
        if (!stmt.Operand) {
            return null;
        }
        if (this.peekTokenIs(Token.SEMICOLON)) {
            this.nextToken();
        }

        return stmt;
    }

    public parseIfStatement(): IfStatement {
        var controlStructure = new IfStatement(null, null, null);

        if (!this.expectPeek(Token.LPAREN)) { return null; }
        
        this.nextToken();
        controlStructure.Operand = this.parseExpression(Precedence.LOWEST);

        if (!this.expectPeek(Token.RPAREN)) { return null; }
        if (!this.expectPeek(Token.LBRACE)) { return null; }

        controlStructure.Consequence = this.parseBlockStatement();
        if (this.peekTokenIs(Token.ELSE)) {
            this.nextToken();
            if (!this.expectPeek(Token.LBRACE)) {
                return null;
            }
            controlStructure.Alternative = this.parseBlockStatement();
        }

        return controlStructure;
    }
    
    public parseForStatement(): ForStatement {
        // TODO: Analyzer should always be handling this:
        this.diagnosticContext.hasLoops = true;
        var controlStructure = new ForStatement(null, null, null);

        if (!this.expectPeek(Token.LPAREN)) { return null; }
        if (!this.expectPeek(Token.IDENT)) { return null; }

        controlStructure.Element = new Identifier(this.currentToken.Literal);
        
        // TODO: Analyzer should always be handling this:
        var declaredVars = this.diagnosticContext.declaredVariables;

        if (!declaredVars[this.currentToken.Literal]) {
             declaredVars[this.currentToken.Literal] = "int"; // todo, check range type here
        }

        if (!this.expectPeek(Token.COMMA)) { return null; }

        this.nextToken();
        controlStructure.Operand = this.parseExpression(Precedence.LOWEST);
        if (controlStructure.Operand.NodeName == "Identifier") {
            
            // TODO: Analyzer should always be handling this:
            if (!this.diagnosticContext.declaredVariables[(controlStructure.Operand  as Identifier).Value]) {
                this.diagnosticContext.undeclaredVariables[(controlStructure.Operand as Identifier).Value] = true;
            }
        }

        if (!this.expectPeek(Token.RPAREN)) { return null; }
        if (!this.expectPeek(Token.LBRACE)) { return null; }

        controlStructure.Consequence = this.parseBlockStatement();
        return controlStructure;
    }
    
    public parseWhileStatement() {
        // TODO: Analyzer should always be handling this:
        this.diagnosticContext.hasLoops = true;
        var Statement = new WhileStatement(null, null);

        if (!this.expectPeek(Token.LPAREN)) { return null;}

        this.nextToken();
        Statement.Operand = this.parseExpression(Precedence.LOWEST);

        if (!this.expectPeek(Token.RPAREN)) { return null;}
        if (!this.expectPeek(Token.LBRACE)) { return null;}

        Statement.Consequence = this.parseBlockStatement();
        return Statement;
    }
    
    public parseSleepStatement() {
        var statement = new SleepStatement(null, null);

        if (!this.expectPeek(Token.LPAREN)) { return null; }

        this.nextToken();
        statement.Operand = this.parseExpression(Precedence.LOWEST);

        if (!this.expectPeek(Token.RPAREN)) { return null; }
        if (!this.expectPeek(Token.LBRACE)) { return null; }

        statement.Consequence = this.parseBlockStatement();
        return statement;
    }

    public parseExecStatement(): ExecStatement {
        var exp = new ExecStatement(null, null);

        if (!this.expectPeek(Token.LBRACKET)) { return null; }

        exp.Operand = this.parseArrayLiteral();

        if (!this.expectPeek(Token.LBRACE)) { return null; }

        exp.Consequence = this.parseBlockStatement();
        return exp;
    }

    public parseAssignmentStatement() {
        var stmt = new AssignmentStatement(new Identifier(this.currentToken.Literal), null);

        if (!this.expectPeek(Token.ASSIGN)) {
            return null;
        }
        this.nextToken();
        stmt.Operand = this.parseExpression(Precedence.LOWEST);
        if (this.peekTokenIs(Token.SEMICOLON)) {
            this.nextToken();
        }
        return stmt;
    }

    public parseLetStatement(pure = false) {
        var stmt = new LetStatement(null, null, null);

        stmt.DataType = this.checkDataType(false);

        if (!this.expectPeek(Token.IDENT)) {
            return null;
        }

        stmt.Identity = new Identifier(this.currentToken.Literal);
        if (!this.peekTokenIs(Token.ASSIGN)) {
            stmt.Value = getDefaultValueNodeForDataType(stmt.DataType);

        } else {
            this.nextToken(2);
            // TODO: Analyzer should always be handling this:
            this.diagnosticContext.declaredVariables[stmt.Identity.Value] = stmt.DataType || "any";
            
            stmt.Value = this.parseExpression(Precedence.LOWEST, pure);
        }
        
        // TODO: Analyzer should always be handling this:
        this.diagnosticContext.declaredVariables[stmt.Identity.Value] = stmt.DataType
            || getDataTypeByNodeName(stmt.Value);

        if (this.peekTokenIs(Token.SEMICOLON)) {
            this.nextToken();
        }

        return stmt;
    }

    public parseClassStatement() {
        var stmt = new ClassStatement(null, null);

        if (!this.expectPeek(Token.IDENT)) {
            return null;
        }
        stmt.Identity = new Identifier(this.currentToken.Literal);
        // TODO: Analyzer should always be handling this:
        this.diagnosticContext.declaredVariables[stmt.Identity.Value] = stmt.Identity.Value;
        this.nextToken();
        
        stmt.Value = this.parseClassLiteral();

        if (this.peekTokenIs(Token.SEMICOLON)) {
            this.nextToken();
        }

        return stmt;
    }

    public parseReturnStatement() {
        var stmt = new ReturnStatement(null);
        this.nextToken();
        stmt.Operand = this.parseExpression(Precedence.LOWEST);
        if (this.peekTokenIs(Token.SEMICOLON)) {
            this.nextToken();
        }
        return stmt;
    }

    public parseBlockStatement(isPureFunction = false) {
        const  block              = new BlockStatement();
        let    hasReturnStatement = false,
               errors             = [] as string[];

        block.Values = [];
        this.nextToken();

        while (!this.currentTokenIs(Token.RBRACE) && !this.currentTokenIs(Token.EOF)) {
            var stmt = this.parseStatement();
            if (stmt.NodeName == "ExpressionStatement") {
                if ((stmt as ExpressionStatement).Operand == null) {
                    continue;
                }
            }

            [hasReturnStatement, errors] = hasReturnStatement 
                                         ? [hasReturnStatement, errors] 
                                         : this.analyzer.analyzeReturnStatement(stmt, isPureFunction);

            if (errors.length) {
                this.errors.push(...errors);
            }

            if (stmt != null) {
                block.Values.push(stmt);
            }
            this.nextToken();
        }

        if (isPureFunction && !hasReturnStatement) {
            this.errors.push("pure function must have a return statement");
            return null;
        }
        return block;
    }


    public parseIdentifier(): Identifier {
        // TODO: Analyzer should always be handling this:
        if (!this.diagnosticContext.declaredVariables[this.currentToken.Literal]) {
            this.diagnosticContext.undeclaredVariables[this.currentToken.Literal] = true;
        }
        return new Identifier(this.currentToken.Literal);
    }

    public parseBoolean(): BooleanLiteral {
        return new BooleanLiteral(this.currentTokenIs(Token.TRUE));
    }

    public parseIntegerLiteral(): IntegerLiteral {
        let lit = new IntegerLiteral(null), value = parseInt(this.currentToken.Literal);
        if (value == null || value == NaN) {
            this.errors.push("could not parse " + this.currentToken.Literal + " as integer");
            return null;
        }
        lit.Value = value;
        return lit;
    }  
    public parseFloatLiteral(): FloatLiteral {
        let lit = new FloatLiteral(null), value = parseFloat(this.currentToken.Literal);
        if (value == null || value == NaN) {
            this.errors.push("could not parse " + this.currentToken.Literal + " as float");
            return null;
        }
        lit.Value = value;
        return lit;
    }

    public parseFunctionLiteral(_, returnType, pure): FunctionNode {
        if (!this.expectPeek(Token.LPAREN)) {
            return null;
        }
        var params = this.parseFunctionParameters();
        if (!params) {
            return null;
        }
       
        const lit = pure
            ? new PureFunctionLiteral(returnType, params[1],  params[0], null)
            : new FunctionLiteral(returnType, params[1], params[0], null);
        
        if (!this.expectPeek(Token.LBRACE)) {
            return null;
        }
        lit.Consequence = this.parseBlockStatement(pure);
        return lit;
    }

    public parsePureFunctionLiteral(_, returnType: string): PureFunctionLiteral {
        returnType = this.parseDataType(true)?.Literal;
        this.nextToken();
        return this.parseFunctionLiteral(null, returnType, true) as PureFunctionLiteral;
    }


    /***
        * *{ ["this is unfortunate in 1 dimension"]---(select())--->[Indeed] }*
        * 
        */
    public parseGraphLiteral(): GraphLiteral {
        const edges = [] as GraphEdge<GraphOperator, Expression, StringLiteral>[],
              nodes = [] as GraphNode<StringLiteral, Expression>[];

        this.graphParser.parseGraph(nodes, edges, "GraphLiteral");
        
        return new GraphLiteral(new ArrayLiteral(edges), new ArrayLiteral(nodes));
    }

    parseGraphLiteralNode(nodes: GraphNode<Expression>[]): string {
        const exp = this.parseExpression(Precedence.LOWEST);  
        const nodeId = exp.NodeName + " " + (exp as Value).Value;

        nodes.push(new GraphNode(new StringLiteral(nodeId), exp));

        return nodeId;
    }

    parseGraphLiteralEdge(direction: "left" | "right", edges: GraphEdge<GraphOperator>[]): GraphEdge<GraphOperator> {
        let operatorType;
        let operatorCallExp;
        //                        ------*( )*----->
        if (this.currentTokenIs(Token.ASTERISK_LPAREN)) {
            this.nextToken();
          
            operatorCallExp = this.parseExpression(0);

            this.nextToken(2);
            this.graphParser.parseDirectionalGraphEdge(direction);
        } else {
            operatorType = BuiltinGraphOperatorType.CONNECT;
            operatorCallExp = new CallExpression(new Identifier(operatorType), [])
        }

        const edge = new GraphEdge(new GraphOperator(
            operatorCallExp, 0
        ), null) 
        
        edges.push(edge);
        return edge;
    }



    parseHashLiteral(): HashLiteral {
        
        var value: Expression = null, 
            hash = new HashLiteral();

        while (!this.peekTokenIs(Token.RBRACE)) {
            let key: Identifier = null;

            this.nextToken();


            //if (this.peekTokenIs(Token.STRING)) {
            if (this.currentTokenIs(Token.STRING)) {
                    let strKey = this.parseStringLiteral();

                key = new Identifier(strKey.Value);

            // } else if (this.peekTokenIs(Token.IDENT)) {
            } else if (this.currentTokenIs(Token.IDENT)) {
                key = this.parseIdentifier();
            }
            
            if (key != null) {
                if (!this.expectPeek(Token.COLON)) {
                    return null;
                }
                this.nextToken();
                value = this.parseExpression(Precedence.LOWEST, false);
    
                hash.Values.push(new HashPair(key, value));
            }
            
            if (!this.peekTokenIs(Token.RBRACE) && !this.expectPeek(Token.COMMA)) {
                return null;
            }
        }

        if (!this.expectPeek(Token.RBRACE)) { return null; }

        return hash;
    }

    parseClassLiteral(): ClassLiteral {
        const clazz = new ClassLiteral(new ArrayLiteral(), new ArrayLiteral());    
        
        while (!this.peekTokenIs(Token.RBRACE)) {
            this.nextToken();
            
            const modifiers: number[] = this.parseModifiers();
            const dataType: string = this.parseDataType(false)?.Literal ?? "";
            let key: Identifier = this.parseIdentifier();
            
            // this.nextToken();
            // check if ClassMethod or ClassProperty
            if (this.peekTokenIs(Token.ASSIGN)) {
                this.nextToken();

                const element = new ClassProperty(dataType, modifiers);

                element.Value = this.parseExpression(Precedence.LOWEST, false);
                clazz.Left.Values.push(new ClassPair<ClassProperty>(key, element));

            } else if (this.expectPeek(Token.LPAREN)) {
                this.nextToken();

                const element = new ClassMethod(dataType, modifiers);

                element.Value = this.parseFunctionLiteral(null, dataType, false) as FunctionLiteral;
                clazz.Right.Values.push(new ClassPair<ClassMethod>(key, element));
            }
        }

        if (!this.expectPeek(Token.RBRACE)) { return null; }

        return clazz;
    }

    parseFunctionParameters(): [Identifier[], string[]] {
        var identifiers = [], types = [];

        if (this.peekTokenIs(Token.RPAREN)) {
            this.nextToken();
            return [identifiers, types];
        }
        this.nextToken();
        if (this.isDataType()) {
            types.push(this.currentToken.Literal);
            this.nextToken();
        }
        var ident = new Identifier(this.currentToken.Literal);
        identifiers.push(ident);
        
        // TODO: Analyzer should always be handling this:
        this.diagnosticContext.declaredVariables[ident.Value] = types[0] || "any";

        while (this.peekTokenIs(Token.COMMA)) {
            this.nextToken();
            this.nextToken();
            if (this.isDataType()) {
                types.push(this.currentToken.Literal);
                this.nextToken();
            }
            ident = new Identifier(this.currentToken.Literal);
            // TODO: Map key of this declaredVariable + datatype must be scoped.
            // TODO: Analyzer should always be handling this:
            this.diagnosticContext.declaredVariables[ident.Value] = types[types.length - 1] || "any";
            identifiers.push(ident);
        }
        
        if (!this.expectPeek(Token.RPAREN)) { return null; }

        return [identifiers, types];
    }

    parseStringLiteral(): StringLiteral {
        return new StringLiteral(this.currentToken.Literal);
    }

    parseArrayLiteral(): ArrayLiteral {
        var array = new ArrayLiteral();
        array.Values = this.parseExpressionList(Token.RBRACKET);
        return array;
    }

    parseExpressionList(end: Token, delimiter = Token.COMMA): Expression[] {
        const list = [];
       
        if (this.peekTokenIs(end)) {
            this.nextToken();
            return list;
        }

        this.nextToken();
        list.push(this.parseExpression(Precedence.LOWEST));

        while (this.peekTokenIs(delimiter)) {
            this.nextToken();
            this.nextToken();
            list.push(this.parseExpression(Precedence.LOWEST));
        }

        if (!this.expectPeek(end)) { return null; }
        return list;
    }   

    

    parseCommentBlock() {
        var endComment = false;
        while (!endComment) {
            this.nextToken();
            endComment = this.currentToken.Type === Token.RCOMMENT;
        }
    }

    private checkDataType(peek = true) {
        if (this.isDataType(peek)) {
            if (peek) {
                this.nextToken();
            }
            return this.currentToken.Literal;
        }
        return null;
    }

    isDataType(peek = false) {
        
        let detector = peek ? (t) => this.peekTokenIs(t) : (t) => this.currentTokenIs(t);

        return detector(Token.LET_BOOL)
            || detector(Token.LET_INT) || detector(Token.LET_FLOAT)
            || detector(Token.LET_STRING) || detector(Token.LET_ARRAY)
            || detector(Token.LET_OBJECT) || detector(Token.LET_FUNCTION)
            || this.isCustomDataType();
    }

    isCustomDataType() {
        var typeStr = this.currentToken.Literal, firstChar = typeStr.charCodeAt(0);
        return (firstChar > 64 && firstChar < 91)
            || firstChar > 122; // anything except special characters and lower-case
    }

    parseDataType(peek: boolean) {
        if (this.isDataType(peek)) {
            //if (!this.peekTokenIs(Token.COLON)) {
                this.nextToken();
            //}
            // this.nextToken();
            return this.currentToken;
        }
    }

}


function getDataTypeByNodeName(Value: Expression): string
{
    return NodeName_To_DataType[Value.NodeName];
}
 