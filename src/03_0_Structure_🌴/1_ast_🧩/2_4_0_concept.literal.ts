import { NodeName } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_2_2_structure-implementation.enum.js";
import { Node }     from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept.js";
import { UnParser } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/system/un-parser";
import { ConceptProjection } from "./2_4_2_concept-projection";

export class ConceptLiteral implements Node {
    NodeName = NodeName.ConceptLiteral;

    constructor(
        public projections: ConceptProjection[]
    ) { }

    public UnParse(ctx: UnParser) {
        return ctx.transpile(this);
    }    

}