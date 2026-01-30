# Dampen for VS Code

VS Code extension for the Dampen UI framework with Language Server Protocol (LSP) support.

## Features

- **Syntax Highlighting**: Full XML-based syntax highlighting for `.dampen` files
- **Language Server Support**: Integration with `dampen-lsp` for advanced features:
  - Autocompletion
  - Diagnostics (error checking)
  - Hover information
  - Go-to-definition
- **Code Snippets**: Quick insertion of common Dampen widgets
- **Automatic LSP Binary Management**: Auto-download and cache the LSP server

## Installation

### From VS Code Marketplace

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Dampen"
4. Click Install

### From VSIX

1. Download the `.vsix` file from releases
2. Open VS Code
3. Go to Extensions (Ctrl+Shift+X)
4. Click "..." menu → "Install from VSIX"
5. Select the downloaded file

## Configuration

The extension provides the following settings:

| Setting | Default | Description |
|---------|---------|-------------|
| `dampen.lspPath` | `""` | Path to the `dampen-lsp` binary. If not set, the extension will search in PATH or download automatically. |
| `dampen.autoDownload` | `true` | Automatically download the `dampen-lsp` binary if not found. |
| `dampen.lspVersion` | `"latest"` | Version of `dampen-lsp` to download (e.g., `'latest'` or `'v1.0.0'`). |

## Commands

The extension provides the following commands:

- **Dampen: Check Syntax** - Validate the current `.dampen` file
- **Dampen: Restart Language Server** - Restart the LSP server

Access these commands through the Command Palette (Ctrl+Shift+P) and type "Dampen".

## Code Snippets

Type the following prefixes and press Tab to insert snippets:

| Prefix | Description |
|--------|-------------|
| `button` | Button widget |
| `column` | Column layout widget |
| `row` | Row layout widget |
| `text` | Text widget |
| `container` | Container widget |
| `padding` | Padding property |
| `margin` | Margin property |
| `width` | Width property |
| `height` | Height property |
| `color` | Color property |
| `bgColor` | Background color property |

## Requirements

- VS Code 1.74.0 or higher
- `dampen-lsp` binary (automatically downloaded if not present)

## Manual LSP Installation

If you prefer to manually install the LSP server:

1. Download the appropriate binary from [GitHub Releases](https://github.com/anomalyco/dampen/releases)
2. Place it in your PATH, or
3. Set the `dampen.lspPath` setting to the binary location

## Development

### Building from Source

```bash
git clone https://github.com/anomalyco/dampen-vscode.git
cd dampen-vscode
npm install
npm run compile
```

### Running in Development Mode

1. Open the project in VS Code
2. Press F5 to launch the Extension Development Host
3. Open a `.dampen` file to test

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions:

1. Check the [GitHub Issues](https://github.com/anomalyco/dampen-vscode/issues)
2. Create a new issue with details about your problem

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.
