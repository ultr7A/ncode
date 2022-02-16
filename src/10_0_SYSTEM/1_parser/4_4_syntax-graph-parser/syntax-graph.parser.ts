import { Statement } from "wrapt.co_re/src/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";

import { Program } from "../../../03_0_Structure_🌴/1_ast/1_0_1_root";
import { SyntaxGraph } from "../../../03_0_Structure_🌴/3_abstract-syntax-graph/0_graph-root";


/**
 * Produces a standard parse-tree, usable for evaluation or transpilation
 */
export class SyntaxGraphParser {
    constructor() {}

    public buildParseTreeFromSyntaxGraph(graph: SyntaxGraph): Program {

        const statements = graph.syntax.Values
            .map(statement => this.applyDataFlowGraphToStatement(graph, statement));

        return new Program(statements);
    }

    private applyDataFlowGraphToStatement(graph: SyntaxGraph, statement: Statement) {
        //

        return statement;
    }

    private pruneDisconnectedNodes(program: Program): Program {
        return program;
    }
}