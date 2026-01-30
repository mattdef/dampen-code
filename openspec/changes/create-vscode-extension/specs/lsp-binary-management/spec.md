## ADDED Requirements

### Requirement: Binary discovery
The extension SHALL locate the `dampen-lsp` binary using a configurable path or system PATH.

#### Scenario: Binary in PATH
- **WHEN** the extension starts
- **AND** no custom path is configured
- **THEN** the extension SHALL search for `dampen-lsp` in the system PATH

#### Scenario: Custom binary path
- **WHEN** a user configures `dampen.lspPath` setting
- **THEN** the extension SHALL use that path to locate the binary

### Requirement: Automatic download
The extension SHALL automatically download the latest `dampen-lsp` release if not found locally.

#### Scenario: Binary not found
- **WHEN** the extension cannot find `dampen-lsp` locally
- **AND** auto-download is enabled
- **THEN** the extension SHALL download the latest release from GitHub
- **AND** cache it in the extension's global storage

#### Scenario: Download failure
- **WHEN** the automatic download fails
- **THEN** the extension SHALL display an error message with manual download instructions

### Requirement: Binary version checking
The extension SHALL verify the LSP binary version and warn if outdated.

#### Scenario: Version check
- **WHEN** the LSP client connects
- **THEN** the extension SHALL check the binary version
- **AND** display a warning if the version is below the minimum required
