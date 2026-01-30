import * as vscode from 'vscode';
import { LspClient } from './lspClient';
import { registerCommands } from './commands';

let lspClient: LspClient | undefined;

export async function activate(context: vscode.ExtensionContext) {
    console.log('Dampen extension is now active');

    // Initialize LSP client
    lspClient = new LspClient(context);
    await lspClient.start();

    // Register commands
    registerCommands(context, lspClient);

    // Add to subscriptions for cleanup
    context.subscriptions.push({
        dispose: () => {
            if (lspClient) {
                lspClient.stop();
            }
        }
    });
}

export function deactivate(): Thenable<void> | undefined {
    if (lspClient) {
        return lspClient.stop();
    }
    return undefined;
}
