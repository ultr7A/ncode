import { SyntaxGraphParser } from "./syntax-graph.parser";
import { TokenizerOne } from "../../0_tokenizer/2_tokenizer/tokenizer.one";
import { ParserOne } from "../../1_parser/2_token-parser/1_parser.one";
import { SyntaxGraph } from "../../../1_Structure_🌴/3_abstract-syntax-graph/0_graph-root";

describe("Parser for transformation SyntaxGraph into (AST) Node", (): void => {
    const syntaxGraphParser = new SyntaxGraphParser();
    const tokenizer = new TokenizerOne();
    const parser = new ParserOne(tokenizer);

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