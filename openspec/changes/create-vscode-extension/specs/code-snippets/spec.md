## ADDED Requirements

### Requirement: Widget snippets
The extension SHALL provide code snippets for common Dampen widgets.

#### Scenario: Button snippet
- **WHEN** a user types "button" and triggers snippet expansion
- **THEN** a `<button>` element template SHALL be inserted

#### Scenario: Column snippet
- **WHEN** a user types "column" and triggers snippet expansion
- **THEN** a `<column>` element template SHALL be inserted

#### Scenario: Row snippet
- **WHEN** a user types "row" and triggers snippet expansion
- **THEN** a `<row>` element template SHALL be inserted

#### Scenario: Text snippet
- **WHEN** a user types "text" and triggers snippet expansion
- **THEN** a `<text>` element template SHALL be inserted

### Requirement: Property snippets
The extension SHALL provide snippets for common widget properties.

#### Scenario: Property completion
- **WHEN** a user is editing a widget element
- **THEN** common properties SHALL be available as snippets
