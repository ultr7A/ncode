import { ConceptOperatorOperator, ConceptOperatorType, ConceptSequenceOperator, ConceptStructureOperator } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/object/0_operation-types_🔍/2_concept-operators";
; 


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

export const conceptPrecedenceMapping: { [key in ConceptPrecedence]: ConceptOperatorType[] } = {
    [ConceptPrecedence.LOWEST          ]: [
        ConceptSequenceOperator.PROJECT, 
        ConceptSequenceOperator.EXTEND,
        ConceptSequenceOperator.SUBTRACT,
    ],

    [ConceptPrecedence.PREPOSITION     ]: [
        ConceptStructureOperator.OF,
        ConceptStructureOperator.AS,
        ConceptStructureOperator.FOR,
        ConceptStructureOperator.THROUGH,
        ConceptStructureOperator.BETWEEN,
    ],
    [ConceptPrecedence.LOGICAL         ]: [
        ConceptStructureOperator.AND,
        ConceptStructureOperator.OR,
        ConceptStructureOperator.NOT,
        ConceptStructureOperator.IS,
        ConceptStructureOperator.HAS,
    ],
    [ConceptPrecedence.SUBORDINATE_CONJ]: [
        ConceptStructureOperator.WHAT,
        ConceptStructureOperator.WHERE,
        ConceptStructureOperator.WHEN,
        ConceptStructureOperator.HOW,
        ConceptStructureOperator.WHY,
    ],
    [ConceptPrecedence.IMPERATIVE      ]: [
        ConceptOperatorOperator.WILL,
        ConceptOperatorOperator.DO,
        ConceptOperatorOperator.DOES,
        ConceptOperatorOperator.MAKE,
        ConceptOperatorOperator.ADD,
        ConceptOperatorOperator.REMOVE,
        ConceptOperatorOperator.READ,
        ConceptOperatorOperator.WRITE,

        ConceptSequenceOperator.FIND,
        ConceptSequenceOperator.SORT,
        ConceptSequenceOperator.TRANSFORM,
        ConceptSequenceOperator.AGGREGATE,
        ConceptSequenceOperator.GROUP,
    ],
    [ConceptPrecedence.ARTICLE         ]: [
        ConceptStructureOperator.A,
        ConceptStructureOperator.THE,
    ],
    [ConceptPrecedence.DETERMINER      ]: [
        ConceptStructureOperator.S,
        ConceptStructureOperator.ALL,
        ConceptStructureOperator.SOME,
        ConceptStructureOperator.NO,
        ConceptStructureOperator.EACH,
        ConceptStructureOperator.EVERY,
        ConceptStructureOperator.PART
    ],
};


export const conceptPrecedences 
    = Object.keys(conceptPrecedenceMapping)
            .map((precedenceLevel: string): [ConceptPrecedence, ConceptOperatorType[]] => {   
                const level = precedenceLevel as unknown as number as ConceptPrecedence;

                return [level, conceptPrecedenceMapping[level]];
            })
            .reduce((previous, current: [ConceptPrecedence, ConceptOperatorType[]], array) => {
                                            
                for (const idx in current[1]) {
                    previous[current[1][idx]] = current[0];
                }

                return previous;
            }, {});