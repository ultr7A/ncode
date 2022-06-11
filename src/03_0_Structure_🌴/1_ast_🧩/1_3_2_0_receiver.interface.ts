import { Expression, Node } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";
import { BlockStatement } from "./1_0_1_root";


export interface IReceiver<N = Node> {
    params: N[];
}


export  interface   IReceiverProcedure<N = Node> 
        extends     IReceiver<N> {

    block: BlockStatement

}

export  interface   IReceiverExpression<N = Node> 
        extends     IReceiver<N> {

    expression: Expression;

}




// export interface ITransformReceiver {

// }

// export interface IConceptReceiver {

// }