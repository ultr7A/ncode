import { Token } from "../../01_1_ELEMENT/1_token_💧/2_1_token";



export interface StateMachineLike<StateType, TransitionType extends string = Token> {
    transitions?: { [key in TransitionType]: StateType };
    transition(trigger: TransitionType): void;
}

// 
export interface StateMachine<StateType, StatesType, TransitionType extends string = Token> 
                 extends StateMachineLike<StateType, TransitionType>
{
    states:       StatesType;
    currentState: StateType;
}

//
export interface StateMachineElement<StateType, StatesType, TransitionType extends string = Token> 
                 extends StateMachineLike<StateType, TransitionType>
{
    overlord:     StateMachine<StateType, StatesType, TransitionType>;
}


export interface Directional<Orientation extends Orient.ation.Type> {
    direction: Orientation;
}

export namespace Orient {

    export type ed<Orientation extends Orient.ation.Type> = Directional<Orientation>;

    export namespace ation {
        export type One  = "forward";
        export type X    = "left" | "right";
        export type XY   =  number;
        export type WXYZ = [number, number, number, number];

        export type Type =  Orient.ation.One | Orient.ation.X | Orient.ation.XY | Orient.ation.WXYZ; 
    }

}
