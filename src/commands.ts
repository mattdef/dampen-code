import * as vscode from 'vscode';
import { LspClient } from './lspClient';

export function registerCommands(context: vscode.ExtensionContext, lspClient: LspClient) {
    // Check Syntax command
    const checkSyntaxDisposable = vscode.commands.registerCommand('dampen.checkSyntax', async () => {
        await lspClient.checkSyntax();
    });

    // Restart Language Server command
    const restartServerDisposable = vscode.commands.registerCommand('dampen.restartServer', async () => {
        await lspClient.restart();
    });

    // Show LSP Output command
    const showOutputDisposable = vscode.commands.registerCommand('dampen.showLspOutput', async () => {
        await lspClient.showLspOutput();
    });

    // Go to Definition command
    const goToDefinitionDisposable = vscode.commands.registerCommand('dampen.goToDefinition', async () => {
        await vscode.commands.executeCommand('editor.action.revealDefinition');
    });

    context.subscriptions.push(
        checkSyntaxDisposable, 
        restartServerDisposable, 
        showOutputDisposable,
        goToDefinitionDisposable
    );
}
