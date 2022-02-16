import { PrimitiveConcept } from "wrapt.co_re/src/Domain [╍🌐╍🧭╍]/object/0_operation-types_🔍/2_concept-operators";
const  { StructureOperator, SequenceOperator, OperatorOperator } = PrimitiveConcept; 


export enum ConceptPrecedence {
    LOWEST           = 0,
    PREPOSITION      = 1,
    LOGICAL          = 2,
    SUBORDINATE_CONJ = 3,
    IMPERATIVE       = 4,
    ARTICLE          = 5,
    DETERMINER       = 6,  
}

// Logical vs Imperative vs Prepositional: 
// --------------------------------------
// Capitalized == User-defined concept
// lower-case  == Builtin ConceptOperator
// N = Object
// P = Preposition
// I = Imperative
// L = Logical
// A = Article
// D = Determiner

/****************************************
 * 
 * [ Condition is  satisfied   for   all scenarios                                    ] 
 * :N:N        :I :N:N       :P:P  :N:D  :N  
 * [ Condition is [Satisfied { for { all Scenario     }     }          ]              ]
 *
 * [  Whether   tis nobler      to suffer   the   strings and arrows  of   outrageous functions     or...    ]
 * :P:P       :I:I  :N      :N:N:P :I     :N:A  :N:N      :L  :N      :P :N:N         :N
 * [  whether [ Tis Nobler] [ [ to Suffer [ the [ Strings and Arrows] of [ Outrageous Functions]] ] or [...] ]
 *  
 * [ Do   some research  ]
 * :I:I :N:D   :N
 * [ do [ some Research] ]
 * 
 ****************************************/

export const conceptPrecedenceMapping: { [key in ConceptPrecedence]: PrimitiveConcept.OperatorType[] } = {
    [ConceptPrecedence.LOWEST          ]: [
        SequenceOperator.PROJECT, 
        SequenceOperator.EXTEND,
        SequenceOperator.SUBTRACT,
    ],

    [ConceptPrecedence.PREPOSITION     ]: [
        StructureOperator.OF,
        StructureOperator.AS,
        StructureOperator.FOR,
        StructureOperator.THROUGH,
        StructureOperator.BETWEEN,
    ],
    [ConceptPrecedence.LOGICAL         ]: [
        StructureOperator.AND,
        StructureOperator.OR,
        StructureOperator.NOT,
        StructureOperator.IS,
        StructureOperator.HAS,
    ],
    [ConceptPrecedence.SUBORDINATE_CONJ]: [
        StructureOperator.WHAT,
        StructureOperator.WHERE,
        StructureOperator.WHEN,
        StructureOperator.HOW,
        StructureOperator.WHY,
    ],
    [ConceptPrecedence.IMPERATIVE      ]: [
        OperatorOperator.WILL,
        OperatorOperator.DO,
        OperatorOperator.DOES,
        OperatorOperator.MAKE,
        OperatorOperator.ADD,
        OperatorOperator.REMOVE,
        OperatorOperator.READ,
        OperatorOperator.WRITE,

        SequenceOperator.FIND,
        SequenceOperator.SORT,
        SequenceOperator.TRANSFORM,
        SequenceOperator.AGGREGATE,
        SequenceOperator.GROUP,
    ],
    [ConceptPrecedence.ARTICLE         ]: [
        StructureOperator.A,
        StructureOperator.THE,
    ],
    [ConceptPrecedence.DETERMINER      ]: [
        StructureOperator.S,
        StructureOperator.ALL,
        StructureOperator.SOME,
        StructureOperator.NO,
        StructureOperator.EACH,
        StructureOperator.EVERY,
        StructureOperator.PART
    ],
};


export const conceptPrecedences 
    = Object.keys(conceptPrecedenceMapping)
            .map((precedenceLevel: string): [ConceptPrecedence, PrimitiveConcept.OperatorType[]] => {   
                const level = precedenceLevel as unknown as number as ConceptPrecedence;

                return [level, conceptPrecedenceMapping[level]];
            })
            .reduce((previous, current: [ConceptPrecedence, PrimitiveConcept.OperatorType[]], array) => {
                                            
                for (const idx in current[1]) {
                    previous[current[1][idx]] = current[0];
                }

                return previous;
            }, {});