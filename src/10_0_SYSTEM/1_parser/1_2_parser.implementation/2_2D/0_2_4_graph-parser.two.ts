

import { Node, Expression, AbstractOperator, IGraphNode, IGraphEdge } 
                                            from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";
import { GraphOperator }                    from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/syntax/1_1_0_expression-elements.js"

import { Token } from "../../../../01_1_ELEMENT/1_token_💧/2_1_token.js"
import { TypedTokenSurface } from "../../../../01_1_ELEMENT/1_token_💧/2_2_token-surface.js"
import { GraphEdge, GraphNode } from "../../../../03_0_Structure_🌴/1_ast_🧩/1_3_0_literal-elements.js"
import { ConceptGraphLiteral, GraphLiteral, StringLiteral } from "../../../../03_0_Structure_🌴/1_ast_🧩/1_3_1_literal.js"
import { Orientation_XY } from "../../../0_0_system-structure/1_0_system-structure.js"


export class GraphParserTwo  <
    GraphOperatorType extends AbstractOperator<any> = GraphOperator, 
    GraphKeyType      extends Node                  = StringLiteral, 
    GraphNodeType     extends Node                  = Expression
> 
{

constructor(
    private readonly nextToken: () => TypedTokenSurface,
    private readonly currentTokenIs: (token: Token) => boolean,

    private readonly parseGraphNode: (nodes: IGraphNode<GraphKeyType, GraphNodeType>[]) => IGraphNode<GraphKeyType, GraphNodeType>,

    private readonly parseGraphEdge: (direction: Orientation_XY, edges: GraphEdge<AbstractOperator<Node>, Node>[]) 
                                                                            => IGraphEdge<GraphOperatorType, GraphKeyType, GraphNodeType>
) {}

    public parseGraph(
        nodes: GraphNode[], 
        edges: GraphEdge<AbstractOperator<Expression>>[], 
        graphConstructor: typeof GraphLiteral | typeof ConceptGraphLiteral
    ) {
        this.nextToken();
        // TODO: implement, based on the 1d version:

    }


    public parseDirectionalGraphEdge(direction: Orientation_XY) {
        this.nextToken(); // skip initial `-` or `->` or `<-`

        // if (direction === "left") {
        //     while(this.currentTokenIs(Token.MINUS) && !this.currentTokenIs(Token.EOF)) {
        //         this.nextToken();
        //     }
        // } else {
        //     while(!(this.currentTokenIs(Token.GT) || this.currentTokenIs(Token.SOURCE)) && !this.currentTokenIs(Token.EOF)) {
        //         this.nextToken();
        //     }
        // }
    }

}