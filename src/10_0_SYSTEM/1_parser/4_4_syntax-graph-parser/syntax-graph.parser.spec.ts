import { SyntaxGraph } from "../../../03_0_Structure_🌴/3_abstract-syntax-graph/0_graph-root";
import { TokenizerOne } from "../../0_tokenizer/1_2_tokenizer.implementation/2_1_1_tokenizer.one";
import { ExpressionParserOne } from "../1_2_parser.implementation/1_1D/1_1_expression-parser.one";
import { SyntaxGraphParser } from "./syntax-graph.parser";

describe("Parser for transformation SyntaxGraph into (AST) Node", (): void => {
    const syntaxGraphParser = new SyntaxGraphParser();
    const tokenizer = new TokenizerOne();
    const parser = new ExpressionParserOne(tokenizer);

    it("should create a [AST Program] from data-flow graph", (): void => {
        tokenizer.loadSourceCode(``);
        const graphProgram = parser.parseProgram();
        const graphDataNodes = [];
        const graphDataEdges = [];
        const syntaxGraph = new SyntaxGraph(graphDataNodes, graphDataEdges, graphProgram, []);
        
        tokenizer.loadSourceCode(``);
        const expectedAST = parser.parseProgram();

        const actualAST = syntaxGraphParser.buildParseTreeFromSyntaxGraph(syntaxGraph);
        expect(actualAST).toEqual(expectedAST);
    })

    it("should create a [AST FunctionLiteral] from data-flow graph", (): void => {
        tokenizer.loadSourceCode(``);
        const graphProgram = parser.parseProgram();
        const graphDataNodes = [];
        const graphDataEdges = [];
        const syntaxGraph = new SyntaxGraph(graphDataNodes, graphDataEdges, graphProgram, []);
        
        tokenizer.loadSourceCode(``);
        const expectedAST = parser.parseProgram();

        const actualAST = syntaxGraphParser.buildParseTreeFromSyntaxGraph(syntaxGraph);
        expect(actualAST).toEqual(expectedAST);
    })

    it("should create a [AST ClassLiteral] from data-flow graph", (): void => {
        tokenizer.loadSourceCode(``);
        const graphProgram = parser.parseProgram();
        const graphDataNodes = [];
        const graphDataEdges = [];
        const syntaxGraph = new SyntaxGraph(graphDataNodes, graphDataEdges, graphProgram, []);
        
        tokenizer.loadSourceCode(``);
        const expectedAST = parser.parseProgram();

        const actualAST = syntaxGraphParser.buildParseTreeFromSyntaxGraph(syntaxGraph);
        expect(actualAST).toEqual(expectedAST);
    })

});