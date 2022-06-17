import { ModuleExport } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/module/module-export";
import { ModuleImport } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/module/module-import";
import { Module }  from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/module/module.js";
import { CodeData } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/source/source-code";
import { IBlockStatement, Statement } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept";
import { NodeName } from "wrapt.co_re/dist/Domain [╍🌐╍🧭╍]/syntax/0_1_2_2_structure-implementation.enum";
import { declarations } from "../../../01_1_ELEMENT/1_token_💧/2_1_token.js";
import { BlockStatement } from "../../../03_0_Structure_🌴/1_ast_🧩/1_0_1_root.js";
import { CallExpression, IndexExpression } from "../../../03_0_Structure_🌴/1_ast_🧩/1_1_1_expression.js";
import { ExpressionStatement, IndexedAssignmentStatement, LetStatement } from "../../../03_0_Structure_🌴/1_ast_🧩/1_2_1_statement.js";
import { FunctionLiteral, Identifier, StringLiteral } from "../../../03_0_Structure_🌴/1_ast_🧩/1_3_1_literal.js";
import { readWholeFile } from "../../../3_Operation_☀/3_util_(🔥)/4_0_io-util.js";
import { nodeObjects } from "../../../4_Frame_⚡/4_io/1_file-system/2_compatibility.js";
import { ILinker }                 from "./0_0_1_module-linker-structure.js";
import { ModuleLinkerEnvironment } from "./1_4_0_module-linker-environment.js";

/* ************************************ *
 * ModuleLinker                         *
 *                                      *
 * ************************************ */
export class ModuleLinker implements ILinker<Module<any>> {
    // 
    public static supportedDeclarations = [
        ...Object.keys(declarations)
    ];
    
    // Linking context:
    private environment: ModuleLinkerEnvironment;

    // Linking operation:
    public link<topology extends CodeData = any>(module: Module<topology>): Module<topology> {
        module.AST = this.transformModuleAST(module.AST, module.Exports)
        return null;
    }



    public registerModuleExport(rootName: string, toName: string, moduleExport: ModuleExport): void {
        this.environment.registerModuleExport(rootName, toName, moduleExport);
    }



    public registerModule(absolutePath: string, module: Module<any>): void {
        this.environment.registerModule(absolutePath, module);
    }

    public isModuleRegistered(modulePath: string): boolean {
        return this.environment.modules[modulePath] != null;
    }

    public resetEnvironment(): void {
        this.environment.reset();
    }


    public async readFile(path: string): Promise<string> {
        return readWholeFile(path, nodeObjects.fs, false)
    }

    public getAbsolutePath(workingPath: string, relativePath: string): string {
        return workingPath + relativePath;
    }

    private getModuleNameKey(modulePath: string): string {
        return modulePath.split("/").pop();
    }

    // import { various_materials } from "the_earth_it_self__directly"  
    //
    // let various_materials = __module__["the_earth_it_self__directly"]["various_materials"] 
    private transformImportStatement(stmt: ModuleImport): LetStatement {

        return new LetStatement(
            "any", 
            stmt.Identity as Identifier, 
            new IndexExpression(
                new IndexExpression(
                    new Identifier("__module__"), 
                    new Identifier(this.getModuleNameKey((stmt.Value as StringLiteral).Value ))
                ),
                stmt.Identity
            )
            //stmt.Value
        );
    }

    // export class LED_LightBulb { ... }
    
    //
    // class LED_LightBulb { ... }
    // __module__["this_file_path_and_name"].LED_LightBulb = LED_LightBulb;
    private transformExportStatement(stmt: ModuleExport): IndexedAssignmentStatement {
        return new IndexedAssignmentStatement(
                                                            
                                                        // TODO: get identifier in Statement value in export
            new IndexExpression(new Identifier("__module__"), stmt.Value),

            stmt.Identity,

            // TODO: get identifier in Statement value in export
            stmt.Value
        )
    }

    private transformModuleStatmentAST(stmt: Statement) {
        return stmt.NodeName === NodeName.ImportStatement ? this.transformImportStatement(stmt as ModuleImport) : 
               stmt.NodeName === NodeName.ExportStatement ? this.transformExportStatement(stmt as ModuleExport) : 
               stmt;
    }

    private transformModuleAST(program: IBlockStatement | Statement, moduleExports: ModuleExport[]): ExpressionStatement {
        let statements = [];
        if ([NodeName.Program, NodeName.BlockStatement].includes(program.NodeName as NodeName ) ) {
            let functionScopedBlock = (program as IBlockStatement).Values.map((statement => this.transformModuleStatmentAST(statement)));

            return new ExpressionStatement(
                new CallExpression(
                    new FunctionLiteral(
                    "object", ["string"], [new Identifier("_module_")], new BlockStatement(functionScopedBlock) 
                ),
                [new Identifier("__module__")]
            ));
        }
       
    }


}