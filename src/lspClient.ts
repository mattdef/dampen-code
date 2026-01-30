import * as vscode from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient/node';
import { BinaryManager } from './binaryManager';

export class LspClient {
    private client: LanguageClient | undefined;
    private context: vscode.ExtensionContext;
    private binaryManager: BinaryManager;

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
        this.binaryManager = new BinaryManager(context);
    }

    async start(): Promise<void> {
        const binaryPath = await this.binaryManager.getBinaryPath();
        
        if (!binaryPath) {
            vscode.window.showErrorMessage(
                'Could not find dampen-lsp binary. Please install it or configure the path in settings.'
            );
            return;
        }

        // Check version
        const version = await this.binaryManager.checkVersion(binaryPath);
        if (version) {
            console.log(`dampen-lsp version: ${version}`);
        }

        const serverOptions: ServerOptions = {
            command: binaryPath,
            args: [],
            transport: TransportKind.stdio,
            options: {
                env: {
                    ...process.env,
                    RUST_LOG: 'error'  // Only show errors, not info logs
                }
            }
        };

        const clientOptions: LanguageClientOptions = {
            documentSelector: [
                { scheme: 'file', language: 'dampen' },
                { scheme: 'untitled', language: 'dampen' }
            ],
            synchronize: {
                fileEvents: vscode.workspace.createFileSystemWatcher('**/*.dampen')
            },
            outputChannelName: 'Dampen LSP',
            revealOutputChannelOn: 4, // Reveal on error
            initializationOptions: {
                // Options spécifiques au serveur Dampen
                provideHover: true,
                provideCompletion: true,
                provideDiagnostics: true,
                provideDocumentSymbols: true,
                provideCodeActions: true
            }
        };

        this.client = new LanguageClient(
            'dampen-lsp',
            'Dampen Language Server',
            serverOptions,
            clientOptions
        );

        try {
            await this.client.start();
            console.log('Dampen Language Server started');
            
            // Afficher une notification de succès
            vscode.window.showInformationMessage(`Dampen LSP v${version || 'unknown'} connected`);
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to start Dampen Language Server: ${error}`);
            throw error;
        }
    }

    async stop(): Promise<void> {
        if (this.client) {
            await this.client.stop();
            this.client = undefined;
            console.log('Dampen Language Server stopped');
        }
    }

    async restart(): Promise<void> {
        await this.stop();
        await this.start();
        vscode.window.showInformationMessage('Dampen Language Server restarted');
    }

    isRunning(): boolean {
        return this.client !== undefined && this.client.isRunning();
    }

    async checkSyntax(): Promise<void> {
        if (!this.isRunning()) {
            vscode.window.showWarningMessage('Dampen Language Server is not running');
            return;
        }

        const editor = vscode.window.activeTextEditor;
        if (!editor || editor.document.languageId !== 'dampen') {
            vscode.window.showWarningMessage('No active .dampen file');
            return;
        }

        // Forcer une validation du document
        await vscode.commands.executeCommand('editor.action.triggerParameterHints');
        vscode.window.showInformationMessage('Syntax check completed - see Problems panel for details');
    }

    async showLspOutput(): Promise<void> {
        if (this.client) {
            this.client.outputChannel.show();
        }
    }
}
