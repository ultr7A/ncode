import { SyntaxGraph } from "../../../03_0_Structure_🌴/3_abstract-syntax-graph/0_graph-root.js"
import { DataNode, DataNodeType } from "../../../03_0_Structure_🌴/3_abstract-syntax-graph/2_graph-data-node.js"
import { ASTGraphEdge, DataEdgeType } from "../../../03_0_Structure_🌴/3_abstract-syntax-graph/4_graph-edge.js"
import { TokenizerOne } from "../../0_tokenizer/1_2_tokenizer.implementation/2_1_1_tokenizer.one.js"
import { ExpressionParserOne } from "../../1_parser/1_2_parser.implementation/1_1D/1_1_expression-parser.one.js"
import { SyntaxGraphUnParser } from "./graph.unparser.js"

describe("Un-parser for transformation of AST into SyntaxGraph", (): void => {
    const syntaxGraphUnParser = new SyntaxGraphUnParser();
    const tokenizer = new TokenizerOne();
    const parser = new ExpressionParserOne(tokenizer);
    
    it("should create a data-flow graph from a [AST BlockStatement]", (): void => {
        tokenizer.loadSourceCode(`
            int counter = 0;
            
            int sum = 0;

            while(counter < 20) {
                sum = sum + counter * 2;
                counter = counter + 1;
            }
        `);
        const program = parser.parseProgram();

        const expectedGraph = new SyntaxGraph(
            [
                new DataNode("0", "0/Subject", DataNodeType.DECLARATION), 
                new DataNode("1", "0/Operand", DataNodeType.LITERAL),
                
                new DataNode("2", "1/Subject", DataNodeType.DECLARATION),
                new DataNode("3", "1/Operand", DataNodeType.LITERAL),

                new DataNode("4", "3/Operand/Left", DataNodeType.REFERENCE),

                new DataNode("5", "3/Consequence/0/Subject", DataNodeType.REFERENCE),
                new DataNode("6", "3/Consequence/0/Operand", DataNodeType.EXPRESSION),
                new DataNode("7", "3/Consequence/0/Operand/Left", DataNodeType.REFERENCE),
                new DataNode("8", "3/Consequence/0/Operand/Right/Left", DataNodeType.REFERENCE),
                new DataNode("9", "3/Consequence/0/Operand/Right/Right", DataNodeType.REFERENCE),
                new DataNode("10","3/Consequence/0/Operand/Right/Right", DataNodeType.LITERAL),

                new DataNode("11","3/Consequence/1/Subject", DataNodeType.REFERENCE),
                new DataNode("12","3/Consequence/1/Operand", DataNodeType.EXPRESSION),
                new DataNode("13","3/Consequence/1/Operand/Left", DataNodeType.REFERENCE),
                new DataNode("14","3/Consequence/1/Operand/Right", DataNodeType.REFERENCE),
                new DataNode("15","3/Consequence/1/Operand/Right", DataNodeType.LITERAL),
            ], 
            [
                new ASTGraphEdge("0", DataEdgeType.WRITE, "1", "0"),  // int counter <-- 0;
                new ASTGraphEdge("1", DataEdgeType.WRITE, "3", "2"),  // int sum <-- 0;

                new ASTGraphEdge("2", DataEdgeType.READ,  "0", "4"),  // int counter --> WhileStatement.Operand.Left
                
                new ASTGraphEdge("3", DataEdgeType.WRITE, "6", "5"),  // int sum <-- AssignmentStatement.Operand
                new ASTGraphEdge("4", DataEdgeType.READ,  "2", "7"),  // int sum --> AssignmentStatement.Operand.Left
                new ASTGraphEdge("5", DataEdgeType.READ,  "0", "8"),  // int counter --> AssignmentStatement.Operand.Right.Left
                new ASTGraphEdge("6", DataEdgeType.READ,  "10", "9"), // 2 --> AssignmentStatement.Operand.Right.Right

                new ASTGraphEdge("7", DataEdgeType.WRITE, "12", "0"), // int counter <-- AssignmentStatement.Operand
                new ASTGraphEdge("8", DataEdgeType.READ,  "0", "13"), // int counter -->  AssignmentStatement.Operand.Left
                new ASTGraphEdge("9", DataEdgeType.READ,  "15", "14"),// 1 --> AssignmentStatement.Operand.Right
            ], 
            program,
            []
        );
        const result = syntaxGraphUnParser.buildSyntaxGraphFromParseTree(program)

        expect(result).toEqual(expectedGraph);
    })

    it("should create a data-flow graph from an [AST FunctionLiteral]", (): void => {
        tokenizer.loadSourceCode(`int fn(int a, int b) {
            int counter = 0;
            
            int sum = 0;

            while(counter < a) {
                sum = sum + counter * b;
                counter = counter + 1;
            }

            return sum;
        }`);
        const program = parser.parseProgram();
       
        const expectedGraph = new SyntaxGraph(
            [
                new DataNode("0", "0/Values/0", DataNodeType.DECLARATION), 

                new DataNode("1", "0/Values/1", DataNodeType.DECLARATION),
                
                new DataNode("2", "0/Consequence/0/Subject", DataNodeType.DECLARATION), 
                new DataNode("3", "0/Consequence/0/Operand", DataNodeType.LITERAL),
                
                new DataNode("4", "0/Consequence/1/Subject", DataNodeType.DECLARATION),
                new DataNode("5", "0/Consequence/1/Operand", DataNodeType.LITERAL),

                new DataNode("6", "0/Consequence/2/Operand/Left", DataNodeType.REFERENCE),
                new DataNode("7", "0/Consequence/2/Operand/Right", DataNodeType.REFERENCE),

                new DataNode("8",  "0/Consequence/2/Consequence/0/Subject", DataNodeType.REFERENCE),
                new DataNode("9",  "0/Consequence/2/Consequence/0/Operand", DataNodeType.EXPRESSION),
                new DataNode("10", "0/Consequence/2/Consequence/0/Operand/Left", DataNodeType.REFERENCE),
                new DataNode("11", "0/Consequence/2/Consequence/0/Operand/Right/Left", DataNodeType.REFERENCE),
                new DataNode("12", "0/Consequence/2/Consequence/0/Operand/Right/Right", DataNodeType.REFERENCE),
                
                new DataNode("13", "0/Consequence/2/Consequence/1/Subject", DataNodeType.REFERENCE),
                new DataNode("14", "0/Consequence/2/Consequence/1/Operand", DataNodeType.EXPRESSION),
                new DataNode("15", "0/Consequence/2/Consequence/1/Operand/Left", DataNodeType.REFERENCE),
                new DataNode("16", "0/Consequence/2/Consequence/1/Operand/Right", DataNodeType.REFERENCE),
                new DataNode("17", "0/Consequence/2/Consequence/1/Operand/Right", DataNodeType.LITERAL),

                new DataNode("18", "0/Consequence/3/Operand", DataNodeType.RETURN)
            ], 
            [
                new ASTGraphEdge("0", DataEdgeType.WRITE, "3", "2"), // int counter <-- 0;
                new ASTGraphEdge("1", DataEdgeType.WRITE, "5", "4"), // int sum <-- 0;

                new ASTGraphEdge("2", DataEdgeType.READ, "2", "6"),  // int counter --> WhileStatement.Operand.Left
                new ASTGraphEdge("3", DataEdgeType.READ, "0", "7"),  // int a --> WhileStatement.Operand.Right
                
                new ASTGraphEdge("4", DataEdgeType.WRITE, "8", "9"), // int sum <-- AssignmentStatement.Operand
                new ASTGraphEdge("5", DataEdgeType.READ, "4", "10"), // int sum --> AssignmentStatement.Operand.Left
                new ASTGraphEdge("6", DataEdgeType.READ, "2", "11"), // int counter --> AssignmentStatement.Operand.Right.Left
                new ASTGraphEdge("7", DataEdgeType.READ, "1", "12"), // int b --> AssignmentStatement.Operand.Right.Right

                new ASTGraphEdge("8", DataEdgeType.WRITE, "14", "13"),// int counter <-- IntegerInfixExpression
                new ASTGraphEdge("9", DataEdgeType.READ, "2", "15"),  // int counter --> AssignmentStatement.Operand.Left
                new ASTGraphEdge("9", DataEdgeType.READ,  "15", "14"),// 1 --> AssignmentStatement.Operand.Right

                new ASTGraphEdge("10", DataEdgeType.READ, "9", "18")  // return sum
            ], 
            program,
            []
        );
        const result = syntaxGraphUnParser.buildSyntaxGraphFromParseTree(program)

        expect(result).toEqual(expectedGraph);
    });

    it("should create a data-flow graph from an [AST ClassLiteral]", (): void => {
        tokenizer.loadSourceCode(`class Abacus {
            public int sum fn(int a, int b) {
                int counter = 0;
                
                int sum = 0;

                while(counter < a) {    
                    sum = sum + counter * b;
                    counter = counter + 1;
                }

                sum = this.specialCalculation(a, sum);

                return sum;
            }

            private int specialCalculation fn(int a_size, int num) {
                return num % (a_size / 2);
            }
        }`);
        const program = parser.parseProgram();
        

        const expectedGraph = new SyntaxGraph(
            [
                // int sum (...) { ...
                new DataNode("0",  "0/Right/0/Values/0", DataNodeType.DECLARATION), 
                new DataNode("1",  "0/Right/0/Values/1", DataNodeType.DECLARATION),
                
                new DataNode("2",  "0/Right/0/Consequence/0/Subject", DataNodeType.DECLARATION), 
                new DataNode("3",  "0/Right/0/Consequence/0/Operand", DataNodeType.LITERAL),
                
                new DataNode("4",  "0/Right/0/Consequence/1/Subject", DataNodeType.DECLARATION),
                new DataNode("5",  "0/Right/0/Consequence/1/Operand", DataNodeType.LITERAL),

                new DataNode("6",  "0/Right/0/Consequence/2/Operand/Left", DataNodeType.REFERENCE),
                new DataNode("7",  "0/Right/0/Consequence/2/Operand/Right", DataNodeType.REFERENCE),

                new DataNode("8",  "0/Right/0/Consequence/2/Consequence/0/Subject", DataNodeType.REFERENCE),
                new DataNode("9",  "0/Right/0/Consequence/2/Consequence/0/Operand", DataNodeType.EXPRESSION),
                new DataNode("10", "0/Right/0/Consequence/2/Consequence/0/Operand/Left", DataNodeType.REFERENCE),
                new DataNode("11", "0/Right/0/Consequence/2/Consequence/0/Operand/Right/Left", DataNodeType.REFERENCE),
                new DataNode("12", "0/Right/0/Consequence/2/Consequence/0/Operand/Right/Right", DataNodeType.REFERENCE),
                
                new DataNode("13", "0/Right/0/Consequence/2/Consequence/1/Subject", DataNodeType.REFERENCE),
                new DataNode("14", "0/Right/0/Consequence/2/Consequence/1/Operand", DataNodeType.EXPRESSION),
                new DataNode("15", "0/Right/0/Consequence/2/Consequence/1/Operand/Left", DataNodeType.REFERENCE),
                new DataNode("16", "0/Right/0/Consequence/2/Consequence/1/Operand/Right", DataNodeType.LITERAL),

                new DataNode("17", "0/Right/0/Consequence/3/Subject", DataNodeType.REFERENCE),
                new DataNode("18", "0/Right/0/Consequence/3/Operand", DataNodeType.CALL),
                new DataNode("19", "0/Right/0/Consequence/3/Operand/Values/0", DataNodeType.REFERENCE),
                new DataNode("20", "0/Right/0/Consequence/3/Operand/Values/1", DataNodeType.REFERENCE),

                new DataNode("21", "0/Right/0/Consequence/4/Operand", DataNodeType.RETURN),
                
                // int specialCalculation(...) { ...
                new DataNode("22", "0/Right/1/Values/0", DataNodeType.DECLARATION),
                new DataNode("23", "0/Right/1/Values/1", DataNodeType.DECLARATION),

                new DataNode("24", "0/Right/1/Consequence/0/Operand", DataNodeType.RETURN),
                new DataNode("25", "0/Right/1/Consequence/0/Operand/Left", DataNodeType.REFERENCE),
                new DataNode("26", "0/Right/1/Consequence/0/Operand/Right/Operand/Left", DataNodeType.REFERENCE),
            ], 
            [
                // int sum (...) { ...
                new ASTGraphEdge("0", DataEdgeType.WRITE, "3", "2"), // int counter <-- 0;
                new ASTGraphEdge("1", DataEdgeType.WRITE, "5", "4"), // int sum <-- 0;

                new ASTGraphEdge("2", DataEdgeType.READ, "2", "6"), // int counter --> WhileStatement.Operand.Left
                new ASTGraphEdge("3", DataEdgeType.READ, "0", "7"), // int a --> WhileStatement.Operand.Right
                
                new ASTGraphEdge("4", DataEdgeType.WRITE, "8", "9"), // int sum <-- AssignmentStatement.Operand
                new ASTGraphEdge("5", DataEdgeType.READ, "4", "10"), // int sum --> AssignmentStatement.Operand.Left
                new ASTGraphEdge("6", DataEdgeType.READ, "2", "11"), // int counter --> AssignmentStatement.Operand.Right.Left
                new ASTGraphEdge("7", DataEdgeType.READ, "1", "12"), // int b --> AssignmentStatement.Operand.Right.Right

                new ASTGraphEdge("8", DataEdgeType.WRITE, "14", "13"),// int counter <-- IntegerInfixExpression
                new ASTGraphEdge("9", DataEdgeType.READ,  "2", "15"), // int counter --> AssignmentStatement.Operand.Left
                new ASTGraphEdge("10", DataEdgeType.READ, "2", "15"), // 1 --> AssignmentStatement.Operand.Right

                new ASTGraphEdge("11", DataEdgeType.WRITE, "18", "17"), //  sum <-- AssignmentStatement.Operand  // sum = this.specialCalculation(a, sum)
                new ASTGraphEdge("12", DataEdgeType.READ, "0", "19"), // a --> AssignmentStatement.Operand.Values[0] 
                new ASTGraphEdge("13", DataEdgeType.READ, "17", "20"), // sum --> AssignmentStatement.Operand.Values[1]

                new ASTGraphEdge("14", DataEdgeType.READ, "17", "21"), // sum --> ReturnStatement.Operand // return sum 

                // int specialCalculation(...) { ...
                new ASTGraphEdge("15", DataEdgeType.READ, "23", "25"), // int num --> ReturnStatement.Operand.Left
                new ASTGraphEdge("16", DataEdgeType.READ, "22", "26")  // int a_size --> ReturnStatement.Operand.Right.Left
                
            ], 
            program,
            []
        );
        const result = syntaxGraphUnParser.buildSyntaxGraphFromParseTree(program);

        expect(result).toEqual(expectedGraph);
    });
});