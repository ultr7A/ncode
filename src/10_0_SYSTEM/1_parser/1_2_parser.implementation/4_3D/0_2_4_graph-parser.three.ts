
import { Node, AbstractOperator, Expression, IGraphEdge, IGraphNode } from "wrapt.co_re/lib/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";
import { GraphOperator }                                              from "wrapt.co_re/lib/Model [╍⬡╍ꙮ╍▦╍]/syntax/1_1_0_expression-elements";

import { Token } from "../../../../01_1_ELEMENT/1_token_💧/2_1_token";
import { TypedTokenVolume } from "../../../../01_1_ELEMENT/1_token_💧/2_4_token-volume";
import { GraphEdge, GraphNode } from "../../../../03_0_Structure_🌴/1_ast/1_3_0_literal-elements";
import { ConceptGraphLiteral, GraphLiteral, StringLiteral } from "../../../../03_0_Structure_🌴/1_ast/1_3_1_literal";
import { Orient } from "../../../0_0_system-structure/1_0_system-structure";


export class GraphParserThree  <
            GraphOperatorType extends AbstractOperator<any> = GraphOperator, 
            GraphKeyType      extends Node                  = StringLiteral, 
            GraphNodeType     extends Node                  = Expression,
            Orientation       extends Orient.ation.Type     = Orient.ation.WXYZ
        >
        implements Orient.ed<Orientation>
{

    direction = [0, 0, 0, 1] as Orientation;

    constructor(
        private readonly nextToken: () => TypedTokenVolume,
        private readonly curTokenIs: (token: Token) => boolean,

        private readonly parseGraphNode: (nodes: IGraphNode<GraphKeyType, GraphNodeType>[]) => IGraphNode<GraphKeyType, GraphNodeType>,

        private readonly parseGraphEdge: (direction: Orient.ation.WXYZ, edges: GraphEdge<AbstractOperator<Node>, Node>[]) 
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


    public parseDirectionalGraphEdge(direction: Orientation) {
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