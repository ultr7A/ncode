import { ConceptExpression, Expression, FunctionNode, IIdentifier, Node }  
                                    from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";
import { ParseTreeAnalysis }        from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/4_0_0_meta.js"
import { Operator }                 from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/object/0_operation-types_🔍/1_primitive-operators.js"
import { ObjectType }               from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/object/object-type.enum.js"
import { STREAM_DIRECTION }         from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/stream-direction.enum.js"
import { Optimizer }                from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/system/optimizer.js"
import { Evaluator }                from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/system/evaluator.js";

import { ArrayObject, BooleanObject, _BuiltinFunctionObject, ClassifiedObject, ConceptObject, ErrorObject, Float, GraphObject, 
    Hash, Integer, LambdaFunction, PureFunction, ReturnValue, StreamObject, StringObject, WheelObject } 
                                                    from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_0_1_object.js";
import { TRUE, FALSE, NULL }                        from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_1_object.singleton.js"

import { Environment, NewEnclosedEnvironment }      from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/1_4_0_environment.js"
import { EObject, FunctionObject, InMemoryScalar }  from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/object/0_1_object-structure.js"
import { copyClassifiedObject, copyHashMap, copyList, nativeBoolToBooleanEObject, newError } 
                                                    from "wrapt.co_re/dist/Model [╍⬡╍ꙮ╍▦╍]/util/3_0_object-util.js";


import { makeRuntimeEnvironment, RecursiveEvaluator } from "./2_4_recursive-evaluator.js"
// import evaluator...
import { ConceptEvaluator } from "./2_2_concept-evaluator.js"
import { Analyzer } from "../../0_3_0_analyzer/1_3_expression-analyzer.js"
import { JSTranspiler } from "../../../3_un-parser/2_token.unparser/2_un-parse_targets/1_1_javascript.js"
import { RuntimeOptimizer } from "../3_1_runtime-optimizer.js"

import { BlockStatement, Program }  from "../../../../03_0_Structure_🌴/1_ast_🧩/1_0_1_root.js"
import {    AssignmentStatement, ClassStatement, ConceptStatement, ExecStatement, ExpressionStatement, 
            ForStatement,   IfStatement, IndexedAssignmentStatement, LetStatement, ReturnStatement, 
            SleepStatement, WhileStatement } 
                                    from "../../../../03_0_Structure_🌴/1_ast_🧩/1_2_1_statement";
import { CallExpression, IndexExpression, InfixExpression, NewExpression, PrefixExpression, StreamExpression } 
                                    from "../../../../03_0_Structure_🌴/1_ast_🧩/1_1_1_expression";
import {    BooleanLiteral, ClassLiteral, ConceptSequenceLiteral, GraphLiteral, Identifier, IntegerLiteral, 
            FloatLiteral, StringLiteral, HashLiteral, MobiusLiteral, WheelLiteral, ArrayLiteral } 
                                    from "../../../../03_0_Structure_🌴/1_ast_🧩/1_3_1_literal";


import { evaluateSourceFile, printNativeString } from "../../../../3_Operation_☀/3_util_(🔥)/4_2_browser-io-util.js"

import { builtins } from "../../../../4_Frame_⚡/2_deprecated_builtin/index.js"
import { nodeObjects } from "../../../../4_Frame_⚡/4_io/1_file-system/2_compatibility.js"
import { readWholeFile } from "../../../../3_Operation_☀/3_util_(🔥)/4_0_io-util.js"
import { Parser } from "../../../1_parser/1_1_parser/3_1_1_parser.js";
import { MethodTransformReceiverProcedure, PropertyTransformReceiverExpression, PropertyTransformReceiverFunction } from "../../../../03_0_Structure_🌴/1_ast_🧩/1_3_2_1_transform.receiver.js";
import { ConceptReceiver } from "../../../../03_0_Structure_🌴/1_ast_🧩/2_4_1_concept.receiver.js";
import { ConceptProjection } from "../../../../03_0_Structure_🌴/1_ast_🧩/2_4_2_concept-projection.js";
import { ConceptProjectorSelector } from "../../../../03_0_Structure_🌴/1_ast_🧩/2_4_3_concept-projector-selector.js";



export class ExpressionEvaluator implements Evaluator<Node, EObject> {
    private analyzer:  Analyzer;
    private optimizer: Optimizer;
    private embeddedInterpreter: RecursiveEvaluator;
    private conceptEvaluator:    ConceptEvaluator;

    constructor(private parser: Parser, optimizer?: RuntimeOptimizer) {
        this.optimizer = optimizer; 
        this.analyzer  = new Analyzer();

        this.embeddedInterpreter = makeRuntimeEnvironment(this, parser);
    }

    public setOptimizer(optimizer: RuntimeOptimizer): void {
        this.optimizer = optimizer;
    }

    private optimizedEvalProgram(program: Program, env: Environment) {
        var analysis = this.analyzer.analyzeParseTree(program);
        return this.optimizer.optimizedEvaluate(analysis, program, env, () => this.evalProgram(program, env) );
    }

    public Eval(node: Node, env: Environment, objectContext?: ClassifiedObject, analysis?: ParseTreeAnalysis): EObject {
        // console.log("Evaluate node /  (Evaluator :: Eval) ");
        
        if (!!!node) {
            return;
        }
        var left: EObject = null, right: EObject = null, val: EObject = null;
    
        switch (node.NodeName) {
            // Statements
            case "Program":
                console.log(JSON.stringify(node, null, 2));
        
                return this.optimizer.optimizedEvaluate(
                                                            analysis, 
                                                            (node as BlockStatement), 
                                                            env, 
                                                            () =>  this.evalProgram(node as Program, env)  
                                                       );
            //evalProgram(node, env);
            case "BlockStatement":
                return this.evalBlockStatement((node as BlockStatement), env, objectContext);
            case "ReturnStatement":
                val = this.Eval((node as ReturnStatement).Operand, env, objectContext);
                if (isError(val)) {
                    return val;
                }
                return new ReturnValue(val);
    
            case "ClassStatement":
                const className = (node as ClassStatement).Identity.Value;
                
                val = this.evalClassLiteral((node as ClassStatement).Value, env, className);   
                if (isError(val)) {
                    return val;
                }

                var pair = (val as ClassifiedObject).Methods[(node as ClassStatement).Identity.Value], 
                    constructor = pair ? pair.Value : null;
    
                if (constructor != null) {
                    (val as ClassifiedObject).Constructor = constructor;
                }

                env.set(className, val);
                
                break;
    
            case "ConceptStatement":
                return this.evalConceptStatement(node as ConceptStatement, env, objectContext);
    
            case "LetStatement":
                val = this.Eval((node as LetStatement).Value, env, objectContext);
                if (isError(val)) {
                    return val;
                }
    
                env.set((node as LetStatement).Identity.Value, val);
            
                break;
    
            case "AssignmentStatement":
                val = this.Eval((node as AssignmentStatement).Operand , env, objectContext);
                if (isError(val)) {
                    return val;
                }
                env.set((node as AssignmentStatement).Subject.Value, val);
                break;
    
            case "ExpressionStatement":
                return this.Eval((node as ExpressionStatement).Operand, env, objectContext);
            // Expressions
            case "PrefixExpression":
                right = this.Eval((node as PrefixExpression).Right, env, objectContext);
                if (isError(right)) {
                    return right;
                }
                return this.evalPrefixExpression((node as PrefixExpression).Operator, right);
    
            case "InfixExpression":
                left = this.Eval((node as InfixExpression).Left, env, objectContext);
                if (isError(left)) {
                    return left;
                }
    
                right = this.Eval((node as InfixExpression).Right, env, objectContext);
                if (isError(right)) {
                    return right;
                }
                return this.evalInfixExpression((node as InfixExpression).Operator, left, right);
    
            case "CallExpression":
                const fun = this.Eval((node as CallExpression).Function, env); //, node.Function.ObjectContext); // objectContext);
                if (isError(fun)) {
                    return fun;
                }
    
                const args = this.evalExpressions((node as CallExpression).Values, env, objectContext);
                if (args.length == 1 && isError(args[0])) {
                    return args[0];
                }
                return applyFunction(fun, env, args, objectContext);
    
            case "IndexExpression":
                left = this.Eval((node as IndexExpression).Left, env, objectContext);
                if (isError(left)) {
                    return left;
                }
    
                return this.evalIndexExpression(
                    left, (node as IndexExpression).Right, 
                    env, ((left as ClassifiedObject).Constructor ? (left as ClassifiedObject) : objectContext));
    
            case "IndexedAssignmentStatement":
                left = this.Eval((node as IndexedAssignmentStatement).Subject, env, objectContext);
                if (isError(left)) {
                    return left;
                }
    
                var assignment = this.Eval((node as IndexedAssignmentStatement).Operand, env, objectContext);
                if (isError(assignment)) {
                    return assignment;
                }
    
                return this.evalIndexedAssignmentStatement(left, (node as IndexedAssignmentStatement).Index, assignment, env, objectContext);
    
            case "Boolean":
                return nativeBoolToBooleanEObject((node as BooleanLiteral).Value);
            case "IntegerLiteral":
                return new Integer((node as IntegerLiteral).Value);
            case "FloatLiteral":
                return new Float((node as FloatLiteral).Value);
            case "FunctionLiteral":
                return new LambdaFunction((node as FunctionNode).Values, (node as FunctionNode).Consequence, env, 
                                            null, objectContext, (node as FunctionNode).ReturnType, (node as FunctionNode).ParameterTypes);
            case "StringLiteral":
                return new StringObject((node as StringLiteral).Value);
                
            case "ArrayLiteral":
                var elements = this.evalExpressions((node as ArrayLiteral).Values, env, objectContext);
                if (elements.length == 1 && isError(elements[0])) {
                    return elements[0];
                }
                return new ArrayObject(elements);
            case "Identifier":
                return this.evalIdentifier(node, env, objectContext);
            case "HashLiteral":
                return this.evalHashLiteral((node as HashLiteral), env);
            case "ClassLiteral":
                return this.evalClassLiteral((node as ClassLiteral), env);
            case "GraphLiteral":
                return this.evalGraphLiteral((node as GraphLiteral), env, objectContext);
            case "WheelLiteral": 
                return this.evalWheelLiteral((node as WheelLiteral), env, objectContext);
            case "MobiusLiteral":
                return this.evalMobiusLiteral((node as MobiusLiteral), env, objectContext);
            case "ConceptSequenceLiteral":
                return this.evalConceptSequenceLiteral((node as ConceptSequenceLiteral), env, objectContext);
            case "StreamExpression":
                return this.evalStreamExpression((node as StreamExpression), env, objectContext);
            case "IfStatement":
                return this.evalIfStatement((node as IfStatement), env, objectContext);
            case "ForStatement":
                return this.evalForStatement((node as ForStatement), env, objectContext);
            case "WhileStatement":
                return this.evalWhileStatement((node as WhileStatement), env, objectContext);
            case "SleepStatement":
                return this.evalSleepStatement((node as SleepStatement), env, objectContext);
            case "NewExpression":
                return this.evalNewExpression((node as NewExpression), env, objectContext);
            case "ExecStatement":
                return this.evalExecStatement((node as ExecStatement), env, objectContext);
        }
        return null;
    }

    public evalProgram(program: Program, env: Environment) {
        var result;
        var statements = program.Values;

        for (var s = 0, l = statements.length; s < l; s++) {
            var stmt = statements[s];

            result = this.Eval(stmt, env);

            if (!!result && result.Message) {
                return result;
            }
        }
        return result;
    }
    
    private evalBlockStatement(block: BlockStatement, env: Environment, objectContext: ClassifiedObject) {
        const statements = block.Values;
        let result; 
        
        for (let bs = 0, l = statements.length; bs < l; bs++) {
            var stmt = statements[bs];
    
            result = this.Eval(stmt, env, objectContext);
            if (!!result) {
                var rt = result && result.Type ? result.Type() : null;
                if (rt == ObjectType.RETURN_VALUE|| rt == ObjectType.ERROR) {
                    return result;
                }
            }
        }
        return result;
    }
    
    private evalExpressions(exps: Expression[], env: Environment, objectContext: ClassifiedObject) {
        var result = [];
        
        for (const idx in exps) {
            const e = exps[idx];

            var evaluated = this.Eval(e, env, objectContext);
            if (isError(evaluated)) {
                return Array();
            }
            result.push(evaluated);
        
        }
        return result;
    }
    
    private evalPrefixExpression(operator: Operator, right: EObject) {
        switch (operator) {
            case Operator.LOGICAL_NOT:
                return this.evalBangOperatorExpression(right);
            case Operator.SUBTRACT:
                return this.evalMinusPrefixOperatorExpression(right);
            case Operator.TYPEOF:
                return this.evalTypeofExpression(right);
            default:
                return newError("unknown operator: %s%s", operator, right.Type());
        }
    }
    
    private evalInfixExpression(operator: Operator, left: EObject, right: EObject) {
        var leftType = left.Type(), rightType = right.Type();
        if (operator == Operator.EQUALITY) {
            return nativeBoolToBooleanEObject((left as InMemoryScalar).Value == (right as InMemoryScalar).Value);
        }
        else if (operator == Operator.NOT_EQUAL) {
            return nativeBoolToBooleanEObject((left as InMemoryScalar).Value !=  (right as InMemoryScalar).Value);
        }
        else if (leftType == ObjectType.INTEGER_OBJ && rightType == ObjectType.INTEGER_OBJ) {
            return this.evalIntegerInfixExpression(operator, left as Integer, right as Integer);
        }
        else if (rightType == ObjectType.FLOAT || leftType == ObjectType.FLOAT) {
            return this.evalFloatInfixExpression(operator, left as Float, right as Float);
        }
        else if (leftType == ObjectType.BOOLEAN || leftType == ObjectType.NULL) {
            return this.evalBooleanInfixExpression(operator, left as BooleanObject, right as BooleanObject);
        }
        else if (rightType == ObjectType.BOOLEAN || rightType == ObjectType.NULL) {
            return this.evalBooleanInfixExpression(operator, left as BooleanObject, right as BooleanObject);
        }
        else if (leftType == ObjectType.STRING && rightType == ObjectType.STRING) {
            return this.evalStringInfixExpression(operator, left as StringObject, right as StringObject);
        }
        else if (leftType != rightType) {
            if (leftType == ObjectType.STRING) {
                if (operator == Operator.MULTIPLY) {
                    return this.evalStringRepeatExpression(left as StringObject, right as Integer);
                } else {
                    return this.evalStringConcatExpression(left as StringObject, right as StringObject, true);
                }
            } else if (rightType == ObjectType.STRING) { // leftType == ObjectType.INTEGER&&
                if (operator == Operator.MULTIPLY) {
                    return this.evalStringRepeatExpression(right as StringObject, left as Integer);
                } else {
                    return this.evalStringConcatExpression(left as StringObject, right as StringObject, false);
                }
            }
            return newError("type mismatch: %s %s %s", leftType, operator, rightType);
        }
        else {
            return newError("unknown operator: %s %s %s", leftType, operator, rightType);
        }
    }
    
    private evalTypeofExpression(right: EObject) {
        if (right.Type() == ObjectType.CLASSIFIED_OBJECT && (right as ClassifiedObject).className != null) {
            return new StringObject((right as ClassifiedObject).className);
        } else {
            return new StringObject(right.Type());
        }
    }
    
    private evalStringConcatExpression(left: EObject, right: EObject, stringFirst: boolean) {
        if (stringFirst) {
            return new StringObject((left as StringObject).Value + right.Inspect());
        } else {
            return new StringObject(left.Inspect() + (right as StringObject).Value);
        }
    }
    
    private evalBooleanInfixExpression(operator: Operator, left: BooleanObject, right: BooleanObject) {
        var leftVal = left.Value, rightVal = right.Value;
        if (leftVal === undefined) {
            leftVal = true;
        }
        if (rightVal === undefined) {
            rightVal = true;
        }
        switch (operator) {
            case Operator.LOGICAL_CONJUNCTION:
                return new BooleanObject(leftVal && rightVal);
            case Operator.LOGICAL_DISJUNCTION:
                return new BooleanObject(leftVal || rightVal);
            default:
                return newError("unknown operator: %s %s %s", left.Type(), operator, right.Type());
        }
    }
    
    private evalIntegerInfixExpression(operator: Operator, left: Integer, right: Integer) {
        var leftVal = left.Value, rightVal = right.Value;
        switch (operator) {
            case Operator.ADD:
                return new Integer(leftVal + rightVal);
            case Operator.SUBTRACT:
                return new Integer(leftVal - rightVal);
            case Operator.MULTIPLY:
                return new Integer(leftVal * rightVal);
            case Operator.DIVIDE:
                return new Integer(leftVal / rightVal);
            case Operator.MOD:
                return new Integer(leftVal % rightVal);
            case Operator.LESS_THAN:
                return nativeBoolToBooleanEObject(leftVal < rightVal);
            case Operator.GREATER_THAN:
                return nativeBoolToBooleanEObject(leftVal > rightVal);
            case Operator.EQUALITY:
                return nativeBoolToBooleanEObject(leftVal == rightVal);
            case Operator.NOT_EQUAL:
                return nativeBoolToBooleanEObject(leftVal != rightVal);
            default:
                return newError("unknown operator: %s %s %s", left.Type(), operator, right.Type());
        }
    }
    
    private evalFloatInfixExpression(operator: Operator, left: Float, right: Float) {
        var leftVal = left.Value, rightVal = right.Value;
        switch (operator) {
            case Operator.ADD:
                return new Float(leftVal + rightVal);
            case Operator.SUBTRACT:
                return new Float(leftVal - rightVal);
            case Operator.MULTIPLY:
                return new Float(leftVal * rightVal);
            case Operator.DIVIDE:
                return new Float(leftVal / rightVal);
            case Operator.MOD:
                return new Float(leftVal % rightVal);
            case Operator.LESS_THAN:
                return nativeBoolToBooleanEObject(leftVal < rightVal);
            case Operator.GREATER_THAN:
                return nativeBoolToBooleanEObject(leftVal > rightVal);
            case Operator.EQUALITY:
                return nativeBoolToBooleanEObject(leftVal == rightVal);
            case Operator.NOT_EQUAL:
                return nativeBoolToBooleanEObject(leftVal != rightVal);
            default:
                return newError("unknown operator: %s %s %s", left.Type(), operator, right.Type());
        }
    }
    
    private evalStringRepeatExpression(left: StringObject, right: Integer) {
        var leftVal = left.Value, rightVal = right.Value;
        return new StringObject(leftVal.repeat(rightVal));
    }
    
    private evalStringInfixExpression(operator: Operator, left: StringObject, right: StringObject) {
        var leftVal = left.Value, rightVal = right.Value;
        switch (operator) {
            case Operator.ADD:
                return new StringObject(leftVal + rightVal);
            case Operator.EQUALITY:
                return nativeBoolToBooleanEObject(leftVal == rightVal);
            case Operator.NOT_EQUAL:
                return nativeBoolToBooleanEObject(leftVal != rightVal);
            case Operator.LESS_THAN:
                return nativeBoolToBooleanEObject(leftVal < rightVal);
            case Operator.GREATER_THAN:
                return nativeBoolToBooleanEObject(leftVal > rightVal);
            default:
                return newError("unknown operator: %s %s %s", left.Type(), operator, right.Type());
        }
    }
    
    private evalNewExpression(ne: NewExpression, env: Environment, objectContext: ClassifiedObject) {
        var classData = this.evalIdentifier(ne.Value, env, objectContext);
        var classType = classData.Type();
    
        if (classType == ObjectType.CLASSIFIED_OBJECT) {
            var instance = copyClassifiedObject(classData);
            
            if (ne.Value.NodeName === "Identifier") {
                instance.Constructor = instance.Methods[(ne.Value as Identifier).Value].Value;
                instance.className = (ne.Value as Identifier).Value;
       
            } else if (ne.Value.NodeName === "ClassLiteral") {
                instance.Constructor = (classData as ClassifiedObject).Constructor;
                instance.className = (classData as ClassifiedObject).className;
            }
    
            this.bindContextToMethods(instance);
    
            return instance;
        }
        else if (classType == ObjectType.HASH) {
            return copyHashMap(classData);
        }  
        else if (classType == ObjectType.ARRAY) {
            return copyList(classData);
        }
        else {
            return newError("new operator can only be used with Class or Hashmap. Invalid type: " + classData.Type());
        }
    }
    
    private bindContextToMethods(instance: ClassifiedObject) {
        var pairs = instance.Methods;
    
        for (var p in pairs) {
            var pairType = pairs[p].Value.Type();
            if (pairType == ObjectType.BUILTIN || pairType == ObjectType.FUNCTION) {
                // console.log("setting object context", instance);
                ((pairs[p].Value as LambdaFunction | _BuiltinFunctionObject).ObjectContext) = instance;
            }
        }
    }
    
    private evalExecStatement(es: ExecStatement, env: Environment, objectContext: ClassifiedObject) {
        var files = es.Operand.Values.map(fileNode => this.Eval(fileNode, env, objectContext).Inspect()+"");
    
        var path = files ? files[0] : "", idx = 0;
        
        if (path.length == 0) {
            return newError("path can't be empty");
        }
    
        var all = [];
        while (idx < files.length) {
            path = files[idx] ? files[idx] : "";
            all.push(evaluateSourceFile(env, this.embeddedInterpreter, path, readWholeFile, nodeObjects.fs));
            idx++;
        }
    
        Promise.all(all).then(function () {
            this.evalBlockStatement(es.Consequence, env, objectContext);
        }).catch(function (err) {
            printNativeString(null, "Error executing file: " + err);
        });
        return NULL;
    }
    
    private evalIfStatement(ie: IfStatement, env: Environment, objectContext: ClassifiedObject) {
        var condition = this.Eval(ie.Operand, env, objectContext);
        if (isError(condition)) {
            return condition;
        }
        if (isTruthy(condition)) {
            return this.Eval(ie.Consequence, env, objectContext);
        }
        else if (ie.Alternative != null) {
            return this.Eval(ie.Alternative, env, objectContext);
        }
        else {
            return NULL;
        }
    }
    
    private evalForStatement(fl: ForStatement, env: Environment, objectContext: ClassifiedObject) {
        var range = this.Eval(fl.Operand, env, objectContext), element = fl.Element.Value, rangeType, index = 0, indexObj = new Integer(index), length = 0;
        if (isError(range)) {
            return range;
        }
        rangeType = range.Type();
        var err, result;
        if (rangeType == ObjectType.INTEGER_OBJ) {
            length = (range as Integer).Value as number;
            while (index < length) {
                indexObj.Value = index;
                env.set(element, indexObj);
                result = this.Eval(fl.Consequence, env, objectContext);
                err = err || isError(result) ? result : null;
                index += 1;
            }
        }
        else if (rangeType == ObjectType.ARRAY) {
            length = (range as ArrayObject).Elements.length;
            while (index < length) {
                indexObj.Value = index;
                env.set(element, indexObj);
                result = this.Eval(fl.Consequence, env, objectContext);
                err = err || isError(result) ? result : null;
                index += 1;
            }
        }
        else if (rangeType == ObjectType.STRING) {
            length = (range as StringObject).Value.length;
            while (index < length) {
                indexObj.Value = index;
                env.set(element, indexObj);
                result = this.Eval(fl.Consequence, env, objectContext);
                err = err || isError(result) ? result : null;
                index += 1;
            }
        }
        else if (rangeType == ObjectType.HASH) {
            var keys = Object.keys((range as Hash).Elements);
            length = keys.length;
            while (index < length) {
                env.set(element, new StringObject(keys[index]));
                result = this.Eval(fl.Consequence, env, objectContext);
                err = err || isError(result) ? result : null;
                index += 1;
            }
            if (err != null) {
                return newError("error in for loop %s", JSON.stringify(err));
            }
        }
        else {
            return newError("unknown range type in for loop: %s", range.Type());
        }
        return NULL;
    }
    
    private evalWhileStatement(ie: WhileStatement, env: Environment, objectContext: ClassifiedObject) {
        var condition = this.Eval(ie.Operand, env);
        if (isError(condition)) {
            return condition;
        }
        while (isTruthy(condition)) {
            this.Eval(ie.Consequence, env, objectContext);
            condition = this.Eval(ie.Operand, env, objectContext);
        }
        return NULL;
    }
    
    private evalSleepStatement(se: SleepStatement, env: Environment, objectContext: ClassifiedObject) {
        var duration = this.Eval(se.Operand, env);
        if (isError(duration)) {
            return duration;
        }
        setTimeout(function () {
            this.Eval(se.Consequence, env, objectContext);
        }, duration.Inspect() as number);
        return NULL;
    }
    
    private evalConceptStatement(node: ConceptStatement, env: Environment, objectContext: ClassifiedObject) {
    
        return NULL;
    }
    
    private evalStreamExpression(se: StreamExpression, env: Environment, objectContext: ClassifiedObject): StreamObject {
        var transforms = [];
        if (se.Transforms.length) {
            var expTransforms = se.Transforms;
            for (var t = 0, l = expTransforms.length; t < l; t++) {
                transforms.push(this.Eval(expTransforms[t], env, objectContext));
            }
        }
        var source = this.Eval(se.Source, env, objectContext);
        var sink = this.Eval(se.Sink, env, objectContext);
        var stream = new StreamObject(se.Direction, transforms, source, sink, "");
        // if the source is a builtin,
        if (source.Type() == "BUILTIN" && se.Direction == STREAM_DIRECTION.READ) { // a host event handler has to be added
            applyBuiltinFunction(source as _BuiltinFunctionObject, [
                transforms.length
                    ? transforms[0] // if there is a stream transform chain, pass the event data to it.
                    : sink // if there are no transformations, connect the source and sink directly with an event handler.
            ], env, objectContext);
        }
        // now the stream is created.. 
        /*
    
                         | Source is builtin     |
                         |_______________________|________________________|_____________________|_____________________
                         | call it               |
                         | to add event listener |
    _____________________|_______________________|
                        
        */
        return stream;
    }
    
    private evalIndexExpression(left: EObject, indexNode: Node, env: Environment, objectContext?: ClassifiedObject) {
    
        let indexExpType = this.getIndexExpType(left, indexNode);
        let indexAndError = this.resolveIndexForClassifiedObjectAndHash(indexExpType, indexNode, env, objectContext);
    
        if (indexAndError[1]) {
            return indexAndError[1];
        }
    
        let index = indexAndError[0];
    
        switch (indexExpType) {
            case "arrayIndex":
                return this.evalArrayIndexExpression(left as ArrayObject, index as Integer);
            case "hashIndex":
                return this.evalHashIndexExpression(left as Hash, index);
            case "classifiedObjectIndex":
                return this.evalClassifiedObjectIndexExpression(left as ClassifiedObject, index as StringObject, objectContext);
            case "stringIndex":
                return this.evalStringIndexExpression(left as StringObject, index);
            default:
                return newError("index operator not supported: %s", left.Type());
        }
    }
    
    private resolveIndexForClassifiedObjectAndHash(
        indexExpType: string, 
        indexNode: Node, 
        env: Environment, 
        objectContext: ClassifiedObject
    ): [EObject, ErrorObject] {
        let index;
    
        if (indexExpType === "classifiedObject" && indexNode.NodeName === "Identifier") {
            index = new StringObject((indexNode as Identifier).Value);
        } else {
            index = this.Eval(indexNode, env, objectContext);
            if (isError(index)) {
                return [null, index];
            }
        }
    
        return [index, null];
    }
    
    private getIndexExpType(left: EObject, index: Node) {
        var indexExpType = left.Type() == ObjectType.ARRAY && index.NodeName == "IntegerLiteral"
        ? "arrayIndex"
        : "default";
    
        indexExpType = left.Type() == ObjectType.HASH ? "hashIndex" : indexExpType;
        indexExpType = left.Type() == ObjectType.CLASSIFIED_OBJECT ? "classifiedObjectIndex" : indexExpType;
        indexExpType = left.Type() == ObjectType.STRING ? "stringIndex" : indexExpType;
    
        return indexExpType;
    }
    
    private evalArrayIndexExpression(array: ArrayObject, index: Integer) {
        var arrayEObject = array, idx = index.Value, max = arrayEObject.Elements.length - 1;
        if (idx < 0 || idx > max) {
            return NULL;
        }
        return arrayEObject.Elements[idx];
    }
    
    private evalHashIndexExpression(hash: Hash, index: EObject) {
        var hashObject = hash, key = "";
    
        if (!(index as StringObject | Identifier).Value) {
            return newError("unusable as hash key: %s", index.Type());
        } else {
            key = (index as StringObject | Identifier).Value;
        }
    
        var value = hashObject.Elements[key];
        
        if (!value) {
            return NULL;
        }
        
        return value;
    }
    
    private evalClassifiedObjectIndexExpression(obj: ClassifiedObject, index: StringObject, objectContext: ClassifiedObject) {
        let key = "";
        
        if (!(index as StringObject).Value) {
            return newError("unusable as hash key: %s", index.Type());
        } else {
            key = (index as StringObject).Value;
        }
    
        var pair = obj.Properties[key];
        if (pair == null) {
            return NULL;
        }
       
        if (!objectContext && pair.modifiers && pair.modifiers.indexOf(3) > -1) {
            return newError("cannot access private field: %s", index.Inspect()+"");
        }
    
        return pair.Value;
    }
    
    private evalStringIndexExpression(stringObject: StringObject, index) {
        var idx = index.Value, max = stringObject.Value.length - 1;
        if (idx < 0 || idx > max) {
            return NULL;
        }
        return new StringObject(stringObject.Value[idx]);
    }
    
    private evalIndexedAssignmentStatement(left: EObject, indexNode: Node, assignment: EObject, env: Environment, objectContext: ClassifiedObject) {
        var indexExpType = this.getIndexExpType(left, indexNode);
        let indexAndError = this.resolveIndexForClassifiedObjectAndHash(indexExpType, indexNode, env, objectContext);
    
        if (indexAndError[1]) {
            return indexAndError[1];
        }
    
        let index = indexAndError[0];
    
        switch (indexExpType) {
            case "arrayIndex":
                return this.evalArrayIndexAssignment(left as ArrayObject, index as Integer, assignment);
            case "hashIndex":
                return this.evalHashIndexAssignment(left as Hash, index as Integer | StringObject, assignment);
            case "classifiedObjectIndex":
                return this.evalClassifiedObjectIndexAssignment(left as ClassifiedObject, index as StringObject, assignment);
            case "stringIndex":
                return this.evalStringIndexAssignment(left as StringObject, index as Integer, assignment);
            default:
                return newError("index operator not supported: %s", left.Type());
        }
    }
    
    private evalStringIndexAssignment(str: StringObject, index: Integer, assignment) {
        var stringObject = str, idx = index.Value, max = stringObject.Value.length - 1;
        if (idx < 0 || idx > max) {
            return NULL;
        }
        var oldStr = stringObject.Value, left = oldStr.substr(0, idx), right = oldStr.substr(idx + 1, oldStr.length - 1);
        stringObject.Value = left + assignment.Inspect() + right;
        return NULL;
    }
    
    private evalArrayIndexAssignment(array: ArrayObject, index: Integer, assignment: EObject) {
        var arrayEObject = array, idx = index.Value, max = arrayEObject.Elements.length - 1;
        if (idx < 0 || idx > max) {
            return NULL;
        }
        arrayEObject.Elements[idx] = assignment;
        return NULL;
    }
    
    private evalHashIndexAssignment(hash: Hash, index: StringObject | Integer | Float, assignment) {
        var hashObject = hash, key = null;
    
        if (!index.Value) {
            return newError("unusable as hash key: %s", index.Type());
        } else {
            key = index.Value;
        }
    
        var pair = hashObject.Elements[key];
        if (pair == null) {
            return NULL;
        }
      
        pair = assignment;
        return NULL;
    }
    
    private evalClassifiedObjectIndexAssignment(obj: ClassifiedObject, index:  StringObject, assignment: EObject) {
        let key;
    
        if (!index.Value) {
            return newError("unusable as hash key: %s", index.Type());
        } else {
            key = index.Value;
        }
    
        let pair = obj.Properties[key]
        if (!pair) {
            return NULL;
        }
    
        pair.Value = assignment;
        return NULL;
    }
    
    private evalIdentifier(node, env: Environment, objectContext) {
        var name = node.Value;
        if (name == "this") {
            if (objectContext != null) {
                return objectContext;
            }
            return newError("statement has no object context");
        } else {
            var ident = env.get(name);
    
            if (ident != null) {
                return ident;
            }
            var builtin = builtins[name];
    
            if (builtin != null && builtin != undefined) {
                return builtin;
            }
            return newError("identifier not found: %s", name);
        }
    }
    
    private evalHashLiteral(node: HashLiteral, env: Environment) {
        var hashmap = new Hash({}), elements = {};
    
        for (var index in node.Values) {
            let value, hashPair = node.Values[index];
    
            if (isError(value)) {
                return value;
            }
            // hashPair = ({ Key: new StringObject(key), Value: value });
            // if (node.Modifiers[key] != null) {
            //     hashPair.modifiers = node.Modifiers[key];
            // }
            elements[hashPair.Left.Value] = this.Eval(hashPair.Right, env);
        }
        hashmap.Elements = elements;
        return hashmap;
    }
    
    private evalClassLiteral(node: ClassLiteral, env: Environment, className?: string): ClassifiedObject {
        const methods = {}, properties = {};
    
        for (const propertyPairIdx in node.Left.Values) {
            const propertyPair = node.Left.Values[propertyPairIdx];
    
            properties[propertyPair.Left.Value] = this.Eval(propertyPair.Right.Value, env);
            properties[propertyPair.Left.Value].modifiers = propertyPair.Right.Modifiers;
        }
    
        let constructor;
    
        for (const methodPairIdx in node.Right.Values) {
            const methodPair = node.Right.Values[methodPairIdx];
    
            methods[methodPair.Left.Value] = this.Eval(methodPair.Right.Value, env);
            methods[methodPair.Left.Value].modifiers = methodPair.Right.Modifiers;
        }
    
        return new ClassifiedObject(constructor, className || "anonymous", null, builtins, methods, properties);
    }
    
    private evalGraphLiteral(node: GraphLiteral, env: Environment, objectContext: ClassifiedObject) {
        const graph = new GraphObject([], []);
        
        for (const e in node.Right.Values) {
            const graphNode = node.Right.Values[e];
    
            graph.addNode(this.Eval(graphNode.Right, env, objectContext), graphNode.Left.Value);
        }
    
        for (const e in node.Left.Values) {
            const edge = node.Left.Values[e];
    
            graph.addEdge(edge.Right.Left.Value, edge.Right.Right.Value, edge.Operator);
        }
    
        return graph;
    }
    
    private evalWheelLiteral(node: WheelLiteral, env: Environment, objectContext: ClassifiedObject) {
        const elements = {};
    
        for (let x in node.Values) {
            elements[node.Values[x].Left.Value] = this.Eval(node.Values[x], env, objectContext); 
        }
        return new WheelObject(elements);
    }
    
    private evalMobiusLiteral(node: MobiusLiteral, env: Environment, objectContext: ClassifiedObject) {
        const elements = {};
    
        for (let x in node.Values) {
            elements[node.Values[x].Left.Value] = this.Eval(node.Values[x], env, objectContext); 
        }
        return new WheelObject(elements);
    }
    
    private evalConceptSequenceLiteral(node: ConceptSequenceLiteral, env: Environment, objectContext: ClassifiedObject): ConceptObject {
        const conceptObj = new ConceptObject([], []);
    
        for (const concept of node.Values) {
            // Connect sequence into graph:
    
        }   
    
        return conceptObj;
    }
    
    private evalConceptExpression(node: ConceptExpression, env: Environment): ConceptObject {
        const conceptObj = new ConceptObject([], []);
    
        
        return conceptObj;
    }
    
    
    private evalBangOperatorExpression(right) {
        switch (right) {
            case TRUE:
                return FALSE;
            case FALSE:
                return TRUE;
            case NULL:
                return TRUE;
            default:
                return FALSE;
        }
    }
    
    private evalMinusPrefixOperatorExpression(right) {
        if (right.Type() != ObjectType.INTEGER_OBJ) {
            return newError("unknown operator: -%s", right.Type());
        }
        var value = right.Value;
        return new Integer(-value);
    }


    // TODO:
    // called from EObject.Inspect()
    public evalViewTransform() {

    }



    private evalPropertyTransformReceiverExpression(receiver: PropertyTransformReceiverExpression): void {


    }

    private evalPropertyTransformReceiverFunction(receiver: PropertyTransformReceiverFunction): void {

    }

    private evalMethodTransformReceiverProcedure(receiver: MethodTransformReceiverProcedure): void {

    }

    private evalConceptReceiver(receiver: ConceptReceiver, object: FunctionObject | ClassifiedObject) {

    }

    
    
    private evalConceptProjection(projection: ConceptProjection): void {

    }

    private evalConceptProjectorSelector(selector: ConceptProjectorSelector): void {

    }



}




// UTILS:

export function applyFunction(
    fn: FunctionObject | ClassifiedObject, 
    env: Environment, 
    args: EObject[], 
    objectContext: ClassifiedObject
) {
    
    const fnType = fn.Type();
    let evaluated;
    switch (fnType) {
        case "pure_function":
            evaluated = (fn as PureFunction)
           .evaluate(createPureFunctionEnv((fn as PureFunction).Parameters, args));

            return unwrapReturnValue(evaluated);
        case "function":
            evaluated = (fn as LambdaFunction)
           .evaluate(extendFunctionEnv(fn as LambdaFunction, args));

            return unwrapReturnValue(evaluated);
            
        case "BUILTIN":
            return applyBuiltinFunction(fn as _BuiltinFunctionObject, args, env, objectContext);
        default:
            return newError("not a function: %s", fn.Type());
    }
}

// TODO: move this into _BuiltinFunctionObject
function applyBuiltinFunction(

    fn: _BuiltinFunctionObject, 
    args: EObject[], 
    
    env: Environment, 
    objectContext?: ClassifiedObject 
    
) {
    const objContext = fn.ObjectContext || objectContext; 

    if (fn.ecsOnly) {
        return fn.Fn.apply(fn, [objContext, objContext ? objContext.builtins : null, ...args]);
    } else {
        return fn.callFromECSRuntime(objContext, args);
    }
}

function createPureFunctionEnv(Parameters: IIdentifier[], args: EObject[]) {
    var env = new Environment(), paramIdx = 0, param = null, nParams = Parameters.length;

    while (paramIdx < nParams) {
        param = Parameters[paramIdx];
        env.set(param.Value, args[paramIdx]);
        paramIdx += 1;
    }
    return env;
}

function extendFunctionEnv(fn: LambdaFunction, args: EObject[]) {
    var env = NewEnclosedEnvironment(fn.Env), paramIdx = 0, param = null, nParams = fn.Parameters.length;
    
    while (paramIdx < nParams) {
        param = fn.Parameters[paramIdx];
        env.set(param.Value, args[paramIdx]);
        paramIdx += 1;
    }

    return env;
}

function unwrapReturnValue(obj: EObject) {
    if (!obj || !obj.Type) {
        return NULL;
    }
    if (obj.Type() == ObjectType.RETURN_VALUE) {
        return (obj as ReturnValue).Value;
    }
    return obj;
}

function isError(obj: EObject) {
    if ((obj) != null) {
        return !!((obj as ErrorObject).Message);
    }
    return false;
}

function isTruthy(obj) {
    return obj && (obj.Value !== false);
}
