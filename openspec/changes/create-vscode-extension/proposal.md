# Proposal: Create VS Code Extension for Dampen

## Why

Dampen is a UI framework that uses XML-based files (`.dampen`) to define widget layouts. Currently, developers have no IDE support when editing these files—no syntax highlighting, no autocompletion, no error checking, and no integration with the Dampen Language Server Protocol (LSP). This creates a poor developer experience and slows down development. A VS Code extension will provide essential tooling support, making Dampen development more productive and accessible.

## What Changes

- **New VS Code extension** package with full TypeScript setup
- **LSP client integration** to connect with `dampen-lsp` binary
- **Syntax highlighting** for `.dampen` files using TextMate grammar
- **Code snippets** for common Dampen widgets (button, column, row, text, etc.)
- **Language features** via LSP: autocompletion, diagnostics, hover information, go-to-definition
- **Automatic LSP binary management**: download and cache the latest `dampen-lsp` release
- **Extension commands**: "Dampen: Check Syntax", "Dampen: Restart Language Server"
- **Packaging and publishing** setup for VS Code Marketplace

## Capabilities

### New Capabilities

- `vscode-extension-core`: Core extension infrastructure, activation, and lifecycle management
- `lsp-client-integration`: LSP client implementation using `vscode-languageclient` to communicate with `dampen-lsp`
- `lsp-binary-management`: Automatic discovery, download, and caching of `dampen-lsp` binary
- `syntax-highlighting`: TextMate grammar for XML-based `.dampen` file colorization
- `code-snippets`: Snippet contributions for common Dampen widget patterns
- `extension-commands`: VS Code command palette integration for Dampen-specific actions

### Modified Capabilities

- None (this is a new extension, no existing specs to modify)

## Impact

- **New repository**: `dampen-vscode/` with complete extension structure
- **Dependencies**: `vscode-languageclient`, `vsce` for packaging
- **Build system**: TypeScript + webpack for bundling
- **CI/CD**: GitHub Actions workflow for automated publishing
- **Documentation**: README with installation and usage instructions
- **LSP dependency**: Requires `dampen-lsp` binary (auto-downloaded or user-provided)
