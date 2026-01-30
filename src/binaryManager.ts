import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as https from 'https';
import { execSync } from 'child_process';

const GITHUB_REPO = 'anomalyco/dampen';
const BINARY_NAME = 'dampen-lsp';

export class BinaryManager {
    private context: vscode.ExtensionContext;

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
    }

    async getBinaryPath(): Promise<string | undefined> {
        // 1. Check custom path configuration
        const config = vscode.workspace.getConfiguration('dampen');
        const customPath = config.get<string>('lspPath');
        if (customPath && fs.existsSync(customPath)) {
            return customPath;
        }

        // 2. Check PATH
        const pathBinary = this.findInPath();
        if (pathBinary) {
            return pathBinary;
        }

        // 3. Check cached binary
        const cachedBinary = this.getCachedBinaryPath();
        if (cachedBinary && fs.existsSync(cachedBinary)) {
            return cachedBinary;
        }

        // 4. Auto-download if enabled
        const autoDownload = config.get<boolean>('autoDownload', true);
        if (autoDownload) {
            try {
                return await this.downloadBinary();
            } catch (error) {
                vscode.window.showErrorMessage(
                    `Failed to download dampen-lsp: ${error}. Please install manually or configure a custom path.`
                );
            }
        }

        return undefined;
    }

    private findInPath(): string | undefined {
        try {
            const command = process.platform === 'win32' ? 'where' : 'which';
            const result = execSync(`${command} ${BINARY_NAME}`, { encoding: 'utf-8' });
            const binaryPath = result.trim().split('\n')[0];
            if (binaryPath && fs.existsSync(binaryPath)) {
                return binaryPath;
            }
        } catch {
            // Binary not found in PATH
        }
        return undefined;
    }

    private getCachedBinaryPath(): string {
        const platform = this.getPlatform();
        const binaryName = platform === 'windows' ? `${BINARY_NAME}.exe` : BINARY_NAME;
        return path.join(this.context.globalStoragePath, binaryName);
    }

    private async downloadBinary(): Promise<string> {
        const platform = this.getPlatform();
        const arch = this.getArch();
        const config = vscode.workspace.getConfiguration('dampen');
        const version = config.get<string>('lspVersion', 'latest');

        const releaseVersion = version === 'latest' ? 'latest' : version;
        const assetName = `${BINARY_NAME}-${platform}-${arch}${platform === 'windows' ? '.exe' : ''}`;

        const downloadUrl = releaseVersion === 'latest'
            ? `https://github.com/${GITHUB_REPO}/releases/latest/download/${assetName}`
            : `https://github.com/${GITHUB_REPO}/releases/download/${releaseVersion}/${assetName}`;

        const targetPath = this.getCachedBinaryPath();

        // Ensure directory exists
        if (!fs.existsSync(this.context.globalStoragePath)) {
            fs.mkdirSync(this.context.globalStoragePath, { recursive: true });
        }

        await this.downloadFile(downloadUrl, targetPath);

        // Make binary executable on Unix systems
        if (platform !== 'windows') {
            fs.chmodSync(targetPath, 0o755);
        }

        return targetPath;
    }

    private downloadFile(url: string, targetPath: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const file = fs.createWriteStream(targetPath);
            https.get(url, (response) => {
                if (response.statusCode === 302 || response.statusCode === 301) {
                    // Follow redirect
                    const redirectUrl = response.headers.location;
                    if (redirectUrl) {
                        file.close();
                        this.downloadFile(redirectUrl, targetPath).then(resolve).catch(reject);
                        return;
                    }
                }

                if (response.statusCode !== 200) {
                    reject(new Error(`Download failed with status ${response.statusCode}`));
                    return;
                }

                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve();
                });
            }).on('error', (err) => {
                fs.unlink(targetPath, () => {});
                reject(err);
            });
        });
    }

    private getPlatform(): string {
        switch (process.platform) {
            case 'win32':
                return 'windows';
            case 'darwin':
                return 'darwin';
            case 'linux':
                return 'linux';
            default:
                return 'linux';
        }
    }

    private getArch(): string {
        switch (process.arch) {
            case 'x64':
                return 'amd64';
            case 'arm64':
                return 'arm64';
            case 'ia32':
                return '386';
            default:
                return 'amd64';
        }
    }

    async checkVersion(binaryPath: string): Promise<string | undefined> {
        try {
            const result = execSync(`"${binaryPath}" --version`, { encoding: 'utf-8' });
            return result.trim();
        } catch {
            return undefined;
        }
    }
}
