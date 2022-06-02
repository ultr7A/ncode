
import { Token } from "../../../01_1_ELEMENT/1_token_💧/2_1_token.js"
import { Precedence }        from         "./2_1_precedence";
import { ConceptPrecedence } from "./2_2_concept-precedence.js"


export type      OperatorPrecedence = Precedence | ConceptPrecedence;
export type      IPrecedences       = Partial<{ [key in Token]: OperatorPrecedence }>;