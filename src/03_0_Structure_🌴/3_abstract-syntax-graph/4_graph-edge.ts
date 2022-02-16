

export enum DataEdgeType {
    READ = 0,
    WRITE = 1
}

export class ASTGraphEdge {

    constructor(
        public id: string,
        public type: DataEdgeType,
        public fromNodeId: string, 
        public toNodeId: string
    ) {}

}