import { DynamicFunction } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/0_1_object-structure";
import { ClassLiteral } from "./1_3_1_literal";
import { ConceptProjectorSelector } from "./2_4_3_concept-projector-selector";
import { ConceptTransform } from "./2_4_4_concept.transform";

/**
 Concept-Projection:


    As in, making "fire" know how to burn things,
    and making "blue" know how to color anything that can have a color, etc..

    Basically, there's ~ProjectorSelectors, which are like RegExp for AST nodes (Functions and Classes), 

    and then ConceptTransformations, which apply the meta-programming, where the selectors match.

    (So you could receive concepts, (which are merely identifiers,)  
     or you could make them into "agents" capable of bringing their own implementation)

    if you define a "concept sequence",
    adjacent elements project and modified subsequent ones.
    
    you would have an N-order automation of class|function modification ✨  

    To make this pattern more accessible, and  allow rapid prototyping,
    TransformReceiver(s) can let you physically play around with the concept-chain 
    (or concept graph, if there's multiple outputs)
 */
export class ConceptProjection {
  
    private projectorSelector: ConceptProjectorSelector; 
    private conceptTransform: ConceptTransform;


    public apply(node: ClassLiteral | DynamicFunction): void {
        // TODO!
    }

    public setConceptProjectoSelector(selectorProjector: ConceptProjectorSelector): void {
        this.projectorSelector = selectorProjector;
    }

    public setConceptTransform(transform: ConceptTransform) {
        this.conceptTransform = transform;
    }

}