import { ASTAddress, ASTAddressScope, ASTPathElement, GraphNode } from "./0_graph-root.js"


export enum DataNodeType {
    DECLARATION = 0,
    REFERENCE = 1,
    LITERAL = 2,
    EXPRESSION = 3,
    CALL = 4,
    RETURN = 5
}

export class DataNode implements GraphNode {
    address: ASTAddress;

    constructor
    (
        public id:            string, 
               address:       string          | ASTPathElement[], 
        public nodeType:      DataNodeType, 
        public addressScope?: ASTAddressScope,
        public treeId                                             = "0"
    ) 
    {
        this.address = new ASTAddress(address, addressScope);
    }
}