

import { IBlockStatement } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept.js"
import { FunctionObject, DynamicFunction }  from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/0_1_object-structure.js"
import { ClassifiedObject }                 from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_0_1_object.js"
import { Environment }                      from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_4_0_environment.js"
import { ecsObjectToNativeObject, nativeListToArray, nativeObjToClassifiedObject, nativeValueToECSValue } from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/util/3_0_object-util.js"

import { LetStatement } from "../../../03_0_Structure_🌴/1_ast/1_2_1_statement.js"
import { builtins } from "../../../4_Frame_⚡/2_deprecated_builtin/index.js"
import { ApplyFunctionFunction } from "./0_0_jit-compiler-structure/0_3_3_eval-types.js"
import { EvaluatorContext } from "./0_0_jit-compiler-structure/0_3_4_evaluator-context-type.js"


/**
 * 
 *     DEPRECATED
 * 
 */
export class JSECSEvaluatorContext implements EvaluatorContext {
    
    program: IBlockStatement;
    env: Environment;
    applyFunction: ApplyFunctionFunction;
    evalFn: Function;

    constructor(applyFunction: ApplyFunctionFunction, evalFn: Function) {
        this.applyFunction = applyFunction;
        this.evalFn = evalFn;
    }
    public setProgram(program: IBlockStatement): JSECSEvaluatorContext {
        this.program = program;
        return this;
    }

	setEnv(env: Environment): JSECSEvaluatorContext {
        this.env = env;
        return this;
    }

	public getVar(identName: string): any {
        var ecsValue = this.env.get(identName);
        // TODO: use a reference some how, if it's not something serializable..
        if (!ecsValue) {
            ecsValue = builtins[identName];
        }
        return (ecsValue === null || ecsValue === undefined) ? null : ecsObjectToNativeObject(ecsValue);
    };
    //TODO: swap implementation with getBuiltinObject 
    public getBuiltin(identName) {
        var builtinObject = builtins[identName];
        return builtinObject ? ecsObjectToNativeObject(builtinObject) : null;
    }

	public getBuiltinObject(identName: string, fieldName: string): any {
        let ecsValue = this.env.get(identName);

        if (!ecsValue) {
            var builtin = builtins[identName];
            if (builtin) {
                var pair = builtin.Pairs[fieldName];
                if (pair) {
                    ecsValue = pair.Value;
                }
            }
        }
        // TODO: use a reference some how, if it's not something serializable..
        return (ecsValue === null || ecsValue === undefined) ? null : ecsObjectToNativeObject(ecsValue);
    }

	public setVar(identName: string, value: any): any {
        if (typeof value === "function") {
            var letStatement = this.program.Values
                .filter(function (statement) { return statement.NodeName === "LetStatement"; })
                .find(function (statement) { return (statement as LetStatement).Identity.Value === identName; });
            //     ^^^ Maybe these can be thrown into a map keyed by identName, ahead of time 
            if (letStatement) {
                this.evalFn(letStatement, this.env);
            }
            else {
                console.error("js ECS Runtime Error: identifier not found: " + identName);
            }
        }
        else {
            this.env.set(identName, nativeValueToECSValue(value));
        }
        return value;
    }

	public callMethod(className: string, methodName: string, args: any[], instance?: Record<string, null>): any {
        var obj = builtins[className];
        if (obj) {
            var fn = obj.Pairs[methodName].Value;
            if (fn) {
                // Don't need to convert the return value if it's already JS
                // console.log("try to call method", fn.Fn);
                return fn.Fn.apply(fn, [null, obj, instance, ...args]);
            }
        }
    }

	public call(identName: string, args: any[]): any {
        var fn = this.env.get(identName);

        if (fn) {
            return this.handleCallAndConvertResultToJS(fn, args);
        }
    }

	public callBuiltin(identName: string, args: any[]): any {
        var fn = builtins[identName];

        if (fn) {
            if (fn.Fn) {
                return fn.Fn.apply(fn.Fn, [null, null, ...args]);

            } else {
                return this.handleCallBuiltinConstructor(identName, fn, args);

            }
        }
    }

	public handleCallBuiltinConstructor(className: string, functor: ClassifiedObject, args: any[]) {
        // Once the instance is created, it too must bear a token of the class name
        var funkstructor = functor.Constructor;

        if (funkstructor) {
            return funkstructor.Fn.apply(funkstructor.Fn, [null, null, ...args]);
        }
    }
    
    public handleCallAndConvertResultToJS(fn: FunctionObject, args: any[], objectContext?: Record<string, unknown>) {
        var representationalScope = objectContext 
                ? nativeObjToClassifiedObject(objectContext) as ClassifiedObject 
                : null;
        var result = this.applyFunction(fn, this.env, nativeListToArray(args).Elements, representationalScope as ClassifiedObject);
        
        if (objectContext && representationalScope) {
            if ((fn as DynamicFunction).stateful) {
                var convertedScope = ecsObjectToNativeObject(representationalScope);
                for (var keyIdx in (fn as DynamicFunction).stateful) {
                    var key = (fn as DynamicFunction).stateful[keyIdx];
                    objectContext[key] = convertedScope[key];
                }
            }
        }
        if (result) {
            return ecsObjectToNativeObject(result);
        }
    }
}