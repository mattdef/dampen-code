## ADDED Requirements

### Requirement: LSP client initialization
The extension SHALL start an LSP client that connects to the `dampen-lsp` binary.

#### Scenario: Client startup
- **WHEN** the extension activates
- **THEN** the LSP client SHALL start and connect to the dampen-lsp server
- **AND** the client SHALL use stdio transport for communication

### Requirement: Language features
The LSP client SHALL support all standard language features for `.dampen` files.

#### Scenario: Document synchronization
- **WHEN** a user edits a `.dampen` file
- **THEN** the LSP client SHALL send document change notifications to the server

#### Scenario: Diagnostics
- **WHEN** the LSP server publishes diagnostics
- **THEN** the client SHALL display them in VS Code's Problems panel

#### Scenario: Autocompletion
- **WHEN** a user triggers autocomplete (Ctrl+Space) in a `.dampen` file
- **THEN** the LSP client SHALL request completions from the server
- **AND** display the results in the editor

#### Scenario: Hover information
- **WHEN** a user hovers over a symbol in a `.dampen` file
- **THEN** the LSP client SHALL request hover information from the server
- **AND** display it in a hover tooltip
