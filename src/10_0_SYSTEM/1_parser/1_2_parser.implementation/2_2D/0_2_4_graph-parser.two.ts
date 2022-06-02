

import { Node, Expression, AbstractOperator, IGraphNode, IGraphEdge } 
                                            from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";
import { GraphOperator }                    from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/syntax/1_1_0_expression-elements";

import { Token } from "../../../../01_1_ELEMENT/1_token_💧/2_1_token";
import { TypedTokenSurface } from "../../../../01_1_ELEMENT/1_token_💧/2_2_token-surface";
import { GraphEdge, GraphNode } from "../../../../03_0_Structure_🌴/1_ast/1_3_0_literal-elements";
import { ConceptGraphLiteral, GraphLiteral, StringLiteral } from "../../../../03_0_Structure_🌴/1_ast/1_3_1_literal";
import { Orientation_XY } from "../../../0_0_system-structure/1_0_system-structure";


export class GraphParserTwo  <
    GraphOperatorType extends AbstractOperator<any> = GraphOperator, 
    GraphKeyType      extends Node                  = StringLiteral, 
    GraphNodeType     extends Node                  = Expression
> 
{

constructor(
    private readonly nextToken: () => TypedTokenSurface,
    private readonly curTokenIs: (token: Token) => boolean,

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
        //     while(this.curTokenIs(Token.MINUS) && !this.curTokenIs(Token.EOF)) {
        //         this.nextToken();
        //     }
        // } else {
        //     while(!(this.curTokenIs(Token.GT) || this.curTokenIs(Token.SOURCE)) && !this.curTokenIs(Token.EOF)) {
        //         this.nextToken();
        //     }
        // }
    }

}