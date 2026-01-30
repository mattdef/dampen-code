## ADDED Requirements

### Requirement: Extension activation
The extension SHALL activate automatically when a `.dampen` file is opened in VS Code.

#### Scenario: Opening a dampen file
- **WHEN** a user opens a file with `.dampen` extension
- **THEN** the extension SHALL activate within 2 seconds

### Requirement: Extension deactivation
The extension SHALL properly clean up all resources when deactivated.

#### Scenario: Extension deactivation
- **WHEN** the extension is deactivated
- **THEN** all language clients SHALL be disposed
- **AND** all event listeners SHALL be removed
