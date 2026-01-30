## Context

Dampen is a UI framework using XML-based `.dampen` files for widget layouts. Currently, developers lack IDE support—no syntax highlighting, autocompletion, or error checking. This extension will bridge that gap by providing a VS Code extension that integrates with the Dampen Language Server Protocol (LSP) implementation (`dampen-lsp`).

The extension needs to handle:
- LSP client lifecycle management
- Automatic discovery/download of the LSP binary
- TextMate grammar for syntax highlighting
- Code snippets for common widgets
- VS Code command integration

## Goals / Non-Goals

**Goals:**
- Provide seamless LSP integration for `.dampen` files
- Support automatic LSP binary management (discovery, download, caching)
- Deliver syntax highlighting via TextMate grammar
- Include useful code snippets for Dampen widgets
- Expose Dampen-specific commands in VS Code
- Support packaging and publishing to VS Code Marketplace

**Non-Goals:**
- Implement the LSP server itself (handled by `dampen-lsp`)
- Provide debugging capabilities for Dampen applications
- Support for other editors (VS Code only)
- GUI designer/visual editor for widgets

## Decisions

### Use vscode-languageclient for LSP integration
**Rationale**: This is the official Microsoft library for LSP clients in VS Code. It provides robust handling of the LSP protocol, document synchronization, and feature support (completions, diagnostics, hover).

**Alternative considered**: Implementing raw JSON-RPC communication manually. Rejected due to complexity and maintenance burden.

### Auto-download LSP binary from GitHub releases
**Rationale**: Users should be able to install the extension and have it work immediately without manual binary setup. GitHub releases is the standard distribution mechanism for open-source tools.

**Alternative considered**: Bundling the binary with the extension. Rejected because it would significantly increase extension size and require platform-specific builds.

### Cache downloaded binaries in extension global storage
**Rationale**: VS Code provides `ExtensionContext.globalStoragePath` for persistent storage across sessions. This avoids re-downloading on every activation.

**Alternative considered**: System-wide installation. Rejected due to permission issues and complexity across different operating systems.

### Use webpack for bundling
**Rationale**: Webpack is the standard bundler for VS Code extensions. It reduces extension size and improves load times by tree-shaking unused code.

**Alternative considered**: No bundling (raw TypeScript output). Rejected because it results in larger extension size and slower activation.

### TextMate grammar for syntax highlighting
**Rationale**: VS Code uses TextMate grammars for syntax highlighting. Since `.dampen` files are XML-based, we can extend or reference XML grammar patterns.

**Alternative considered**: Semantic highlighting via LSP. Rejected because TextMate is faster for initial load and sufficient for basic XML structure highlighting.

### Platform-specific binary selection
**Rationale**: `dampen-lsp` will have different binaries for Windows, macOS, and Linux. The extension must detect the platform and download the appropriate binary.

**Implementation**: Use `process.platform` to detect OS and construct the correct download URL.

## Risks / Trade-offs

**[Risk] GitHub API rate limiting for binary downloads**
→ Mitigation: Cache binaries locally and only check for updates periodically. Provide manual download instructions as fallback.

**[Risk] LSP binary incompatibility with user system**
→ Mitigation: Support configurable binary path for users who need to provide their own build. Clear error messages when binary fails to start.

**[Risk] Extension size growth with bundled dependencies**
→ Mitigation: Use webpack tree-shaking. Keep `vscode-languageclient` as the only major dependency.

**[Risk] Version mismatch between extension and LSP binary**
→ Mitigation: Implement version checking on connection. Display warning if binary version is incompatible.

**[Trade-off] Auto-download vs. user control**
Some users may prefer to manage the binary themselves. We provide both: auto-download as default, with configuration option to disable and specify custom path.

## Migration Plan

**Initial Release (v0.1.0):**
1. Extension published to VS Code Marketplace
2. Users install via VS Code extensions panel
3. Extension auto-downloads LSP binary on first activation
4. `.dampen` files immediately get syntax highlighting and LSP features

**Rollback Strategy:**
- Users can uninstall extension via VS Code
- No persistent system changes made (binary cached in extension storage)
- Manual cleanup: delete `~/.config/Code/User/globalStorage/<publisher>.dampen/`

## Open Questions

1. **LSP binary versioning**: Should we pin to a specific version or always download latest? (Leaning toward configurable with sensible default)

2. **Proxy support**: How should the extension handle corporate proxies when downloading binaries? (May need to respect VS Code's proxy settings)

3. **Multi-root workspaces**: Should the extension support different LSP binary versions per workspace folder? (Probably not for v1)

4. **Snippet scope**: How comprehensive should the snippet library be? Start with top 10 widgets, expand based on user feedback.
