## ADDED Requirements

### Requirement: Check syntax command
The extension SHALL provide a "Dampen: Check Syntax" command.

#### Scenario: Manual syntax check
- **WHEN** a user runs the "Dampen: Check Syntax" command from the palette
- **THEN** the extension SHALL request a validation from the LSP server
- **AND** display the results

### Requirement: Restart language server command
The extension SHALL provide a "Dampen: Restart Language Server" command.

#### Scenario: Server restart
- **WHEN** a user runs the "Dampen: Restart Language Server" command
- **THEN** the LSP client SHALL stop and restart
- **AND** reconnect to the server

### Requirement: Command palette integration
All commands SHALL be accessible from the VS Code command palette.

#### Scenario: Command discovery
- **WHEN** a user opens the command palette (Ctrl+Shift+P)
- **AND** types "Dampen"
- **THEN** all Dampen commands SHALL be listed
