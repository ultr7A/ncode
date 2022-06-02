
import { AbstractOperator, Node, Expression, IGraphEdge, IGraphNode } 
                            from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";
import { GraphOperator }    from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/syntax/1_1_0_expression-elements";

                 import { Token } from "../../../../01_1_ELEMENT/1_token_💧/2_1_token";
import { Pair } from "../../../../03_0_Structure_🌴/1_ast/1_3_0_literal-elements";
import { StringLiteral } from "../../../../03_0_Structure_🌴/1_ast/1_3_1_literal";
import { Oriented, Orientation_X } from "../../../0_0_system-structure/1_0_system-structure";


export class GraphParserOne
                <
                    GraphOperatorType      extends AbstractOperator<any> = GraphOperator, 
                    GraphNodeValueType     extends Node                  = Expression,
                    GraphNodeType          extends IGraphNode<any, any>  = IGraphNode<StringLiteral, GraphNodeValueType>,
                    GraphEdgeType          extends IGraphEdge<any, StringLiteral, GraphNodeValueType>
                                                                         = IGraphEdge<GraphOperatorType, StringLiteral, GraphNodeValueType>
                > 
        implements Oriented<Orientation_X>
{

    public direction: Orientation_X = "right";

    constructor(
        private readonly nextToken:      ()             => void,
        private readonly curTokenIs:     (token: Token) => boolean,
        
                                                   // TODO:  Use component class VS method ref to avoid type `Function`
        private readonly parseGraphNode: Function, //(nodes: GraphNodeType[])                            => GraphNodeType,
        private readonly parseGraphEdge: Function  //(direction: Orientation_X, edges: GraphEdgeType[]) => GraphEdgeType
    ) {}

    public parseGraph(
        nodes: GraphNodeType[], 
        edges: GraphEdgeType[], 
        graphType: "GraphLiteral" | "ConceptGraphLiteral"
    ) {
        this.nextToken();
        let nodeId = "";
        // In parser.one (1 dimension), edges always occur btween nodes.   
        while (!this.curTokenIs(Token.RBRACE_ASTERISK) && !this.curTokenIs(Token.EOF)) {
        
            if (this.curTokenIs(Token.LT) || this.curTokenIs(Token.SINK)) { // Edge pointing left
                const edge = this.parseGraphEdge("left", edges);
                
                const fromNodeId = this.parseGraphNode(nodes).Left;
                const from_and_to = new Pair(new StringLiteral(fromNodeId), new StringLiteral(nodeId));

                edge.Right = from_and_to;

            } else if (this.curTokenIs(Token.MINUS) || this.curTokenIs(Token.SOURCE)) { // Edge pointing right
                const edge = this.parseGraphEdge("right", edges);

                const toNodeId = this.parseGraphNode(nodes).Left;
                const from_and_to = new Pair(new StringLiteral(nodeId), new StringLiteral(toNodeId));
            
                edge.Right = from_and_to;

            } else { // Otherwise, this is a graph node:
                // Keep track of last node:
                nodeId = this.parseGraphNode(nodes).Left;
            }

            this.nextToken();
        }
    }


    public parseDirectionalGraphEdge(direction: "left" | "right") {
        this.nextToken(); // skip initial `-` or `->` or `<-`

        if (direction === "left") {
            while(this.curTokenIs(Token.MINUS) && !this.curTokenIs(Token.EOF)) {
                this.nextToken();
            }
        } else {
            while(!(this.curTokenIs(Token.GT) || this.curTokenIs(Token.SOURCE)) && !this.curTokenIs(Token.EOF)) {
                this.nextToken();
            }
        }
    }

}