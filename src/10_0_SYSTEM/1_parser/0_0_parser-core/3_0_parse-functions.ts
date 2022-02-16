import { Node } from "wrapt.co_re/src/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";

export type PrefixParseFn <ParamNodeType extends Node, OutputType extends Node = Node> 
        = (exp?: ParamNodeType, returnType?: string, pure?: boolean) => OutputType;


export type InfixParseFn  <ParamNodeType extends Node, OutputType   extends Node = Node>
        = (exp?: ParamNodeType)                                      => OutputType;


export type PostfixParseFn<ParamNodeType extends Node, OutputType extends Node = Node> 
        = (exp?: ParamNodeType)                                      => OutputType;        

