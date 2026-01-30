## ADDED Requirements

### Requirement: XML grammar support
The extension SHALL provide TextMate grammar for syntax highlighting of `.dampen` files.

#### Scenario: File opened
- **WHEN** a `.dampen` file is opened
- **THEN** the file SHALL be recognized as XML-based
- **AND** syntax highlighting SHALL be applied

### Requirement: Dampen-specific tokens
The grammar SHALL highlight Dampen-specific XML elements and attributes.

#### Scenario: Widget highlighting
- **WHEN** a `.dampen` file contains widget elements (button, column, row, text, etc.)
- **THEN** these elements SHALL be highlighted as keywords

#### Scenario: Attribute highlighting
- **WHEN** a `.dampen` file contains widget attributes
- **THEN** attribute names SHALL be highlighted distinctly from values
