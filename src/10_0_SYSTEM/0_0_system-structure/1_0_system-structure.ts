import { Token } from "../../01_1_ELEMENT/1_token_💧/2_1_token";



export interface Directional<Orientation extends Orientation_Type> {
    direction: Orientation;
}

export type Oriented<Orientation extends Orientation_Type> = Directional<Orientation>;

export type Orientation_One  = "forward";
export type Orientation_X    = "left" | "right";
export type Orientation_XY   =  number;
export type Orientation_WXYZ = [number, number, number, number];
export type Orientation_Type =  Orientation_One | Orientation_X | Orientation_XY | Orientation_WXYZ; 
 

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
