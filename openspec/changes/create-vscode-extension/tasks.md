## 1. Project Setup

- [x] 1.1 Create extension directory structure (`dampen-vscode/`)
- [x] 1.2 Initialize npm project with `package.json`
- [x] 1.3 Install TypeScript and configure `tsconfig.json`
- [x] 1.4 Install VS Code extension dependencies (`vscode-languageclient`, `@types/vscode`)
- [x] 1.5 Set up webpack configuration for bundling
- [x] 1.6 Create `.vscode/` directory with `launch.json` and `tasks.json`

## 2. Extension Core

- [x] 2.1 Create `src/extension.ts` with activation/deactivation handlers
- [x] 2.2 Implement extension activation on `.dampen` file open
- [x] 2.3 Add proper resource cleanup on deactivation
- [x] 2.4 Configure `package.json` contribution points (activation events, categories)

## 3. LSP Binary Management

- [x] 3.1 Create `src/binaryManager.ts` for binary discovery logic
- [x] 3.2 Implement PATH search for `dampen-lsp` binary
- [x] 3.3 Add configuration option `dampen.lspPath` for custom binary path
- [x] 3.4 Implement GitHub release download functionality
- [x] 3.5 Add binary caching in extension global storage
- [x] 3.6 Implement platform detection (Windows/macOS/Linux) for correct binary
- [x] 3.7 Add version checking and compatibility warnings
- [x] 3.8 Handle download failures with user-friendly error messages

## 4. LSP Client Integration

- [x] 4.1 Create `src/lspClient.ts` for LSP client management
- [x] 4.2 Implement LSP client initialization with stdio transport
- [x] 4.3 Configure document synchronization (incremental or full)
- [x] 4.4 Register language features (completions, diagnostics, hover)
- [x] 4.5 Handle LSP server lifecycle (start, stop, restart)
- [x] 4.6 Implement error handling for connection failures

## 5. Syntax Highlighting

- [x] 5.1 Create `syntaxes/dampen.tmLanguage.json` TextMate grammar
- [x] 5.2 Define XML-based token patterns for `.dampen` files
- [x] 5.3 Add highlighting for Dampen widget elements (button, column, row, text, etc.)
- [x] 5.4 Configure attribute name and value highlighting
- [x] 5.5 Register grammar in `package.json` contributes.languages

## 6. Code Snippets

- [x] 6.1 Create `snippets/dampen-snippets.json` snippet definitions
- [x] 6.2 Add button widget snippet
- [x] 6.3 Add column widget snippet
- [x] 6.4 Add row widget snippet
- [x] 6.5 Add text widget snippet
- [x] 6.6 Add common property snippets
- [x] 6.7 Register snippets in `package.json` contributes.snippets

## 7. Extension Commands

- [x] 7.1 Implement "Dampen: Check Syntax" command
- [x] 7.2 Implement "Dampen: Restart Language Server" command
- [x] 7.3 Register commands in `package.json` contributes.commands
- [x] 7.4 Add command palette menu items
- [x] 7.5 Implement command handlers in `src/commands.ts`

## 8. Configuration

- [x] 8.1 Define `dampen.lspPath` configuration option
- [x] 8.2 Define `dampen.autoDownload` configuration option
- [x] 8.3 Define `dampen.lspVersion` configuration option
- [x] 8.4 Register configuration properties in `package.json` contributes.configuration

## 9. Documentation

- [x] 9.1 Write comprehensive `README.md` with installation instructions
- [x] 9.2 Document configuration options
- [x] 9.3 Add usage examples and screenshots
- [x] 9.4 Create `CHANGELOG.md` for version history
- [x] 9.5 Add `LICENSE` file (MIT recommended)

## 10. Build and Packaging

- [x] 10.1 Configure build scripts in `package.json`
- [x] 10.2 Set up webpack production build
- [x] 10.3 Install `vsce` for packaging
- [x] 10.4 Create extension icon and branding assets
- [x] 10.5 Test `vsce package` locally
- [x] 10.6 Verify extension installs and works in VS Code

## 11. Publishing

- [ ] 11.1 Create publisher account on VS Code Marketplace
- [ ] 11.2 Generate personal access token for publishing
- [ ] 11.3 Configure `package.json` with publisher ID
- [ ] 11.4 Create GitHub Actions workflow for CI/CD
- [ ] 11.5 Publish v0.1.0 to VS Code Marketplace
