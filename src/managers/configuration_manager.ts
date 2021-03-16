import * as vscode from 'vscode';

export interface IConfigurationManager {
    getExtensionsToExclude() : string | undefined
}

export class ConfigurationManager implements IConfigurationManager {
    private readonly extensionToExcludeParameterKey: string = 'smart-index.extensionsToExclude';
    
    getExtensionsToExclude(): string | undefined {
        return this.getParameter(this.extensionToExcludeParameterKey);
    }


    private getParameter(parameterKey: string): string | undefined {
        return vscode.workspace.getConfiguration().get(parameterKey);
    }

}