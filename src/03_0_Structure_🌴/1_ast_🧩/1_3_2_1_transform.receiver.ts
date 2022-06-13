/**
    
    TransformReceiver:

        tells class or function how to modify its behavior, 
        as a function of 3d (or 2d) transforms applied to it, 
        in 3d/VR, embodied-computing environment.


    Variants:
        
        -   PropertyTransformReceiverExpression
        -   PropertyTransformReceiverFunction
        -   MethodTransformReceiverProcedure
        -   RuntimeTransformReceiverHandler
           

    Example of a Transform-Receiver:

        Maybe you make a Boxed Type, for Float, 
        where, in VR,  if one of your instances of it 
        is rotated along Y-Axis,  
        it acts as a potentiometer, 
        and modulates the floating-point's value, linearly.

        ..You then might add another TransformReceiver
        to have raising and lowering the boxed Float object 
        divide or multiply the current value,  
        or set it to specific, known values, 
        depending on how high or low 
        its 3d representation was shifted.
**/

import { DataType }         from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/primitive/type.enum.js";
import { Expression, Node } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept.js";
import { NodeName }         from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_2_2_structure-implementation.enum.js";
import { UnParser } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/system/un-parser";
import { BlockStatement } from "./1_0_1_root.js";
import { Identifier } from "./1_3_1_literal.js";
import { IReceiverExpression, IReceiverProcedure } from "./1_3_2_0_receiver.interface.js";



export type TransformReceiver = IReceiverProcedure | IReceiverExpression;


/**
 * public float angle = +@(float yTranslation) => yTranslation * 1000.0;
 */
export  class       PropertyTransformReceiverExpression
        implements  IReceiverExpression<Identifier>, Node
{
    NodeName = NodeName.PropertyTransformReceiverExpression;

    params:     Identifier[];
    paramTypes: DataType[];
    expression: Expression;

    UnParse(ctx: UnParser): string {
        return ctx.unParse(this);
    }
}

/**
 * public string zone = +@(Vector translation, Quaternion orientation) {
 *      for (int idx, this.regions) {
 *        Region r = this.regions[idx];
 * 
 *        if (Math.round(translation.length() / 100) == idx) {
 * 
 *           return this.regions[idx].String() +
 *                                    ": "     +
 *                        orientation.String();
 *        }
 *      }
 * 
 *      return "default_zone";
 * }
 */
export  class       PropertyTransformReceiverFunction 
        implements  IReceiverProcedure<Identifier>, Node 
{
    NodeName = NodeName.PropertyTransformReceiverFunction;

    params:     Identifier[];
    paramTypes: DataType[];
    block:      BlockStatement;

    UnParse(ctx: UnParser): string {
        return ctx.unParse(this);
    }
}

/**
 * 
 * public void performAction() {
 *      int code = 0; 
 * 
 *      +@(float rotationZ) {
 *          code = Math.floor((rotationZ * 100.0) / (Math.PI * 2));
 *      }
 * 
 *      this.submitCode(code % this.status);
 * }
 * 
 */
export  class       MethodTransformReceiverProcedure 
        implements  IReceiverProcedure<Identifier>, Node
{
    NodeName = NodeName.MethodTransformReceiverProcedure;
    
    params:     Identifier[];
    paramTypes: DataType[];
    block:      BlockStatement; 

    UnParse(ctx: UnParser): string {
        return ctx.unParse(this);
    }
}


/**
 * 
 * +@(Vector translation) {
 * 
 *    this.visual.material.opacity = 1.0 / translation.length();
 * 
 * }
 * 
 */
export  class       RuntimeTransformReceiverHandler
        implements  IReceiverProcedure<Identifier>, Node
{
    NodeName = NodeName.RuntimeTransformReceiverHandler;


    params:     Identifier[];
    paramTypes: DataType[];
    block:      BlockStatement;

    UnParse(ctx: UnParser): string {
        return ctx.unParse(this);
    }
}
